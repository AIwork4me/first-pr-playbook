#!/usr/bin/env node
// validate-docs.mjs — zero-dependency documentation quality gate for first-pr-playbook.
// Checks: UTF-8 integrity, internal links & relative paths, lesson structure (A–J),
// navigation (prev/next/cross-language), bilingual parity (lessons/prompts/templates/docs),
// and README language-switch links.
// Exit code 0 = PASS, 1 = FAIL. Warnings do not fail the run.
// Note: this script proves structural parity and link integrity only — translation
// quality and semantic equivalence remain human review responsibilities.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';

const ROOT = process.cwd();
const decoder = new TextDecoder('utf-8', { fatal: true });

let failures = 0;
let warnings = 0;
const fail = (msg) => { failures++; console.error(`  FAIL ${msg}`); };
const warn = (msg) => { warnings++; console.warn(`  WARN ${msg}`); };

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === '.git' || entry === 'node_modules') continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith('.md')) out.push(p);
  }
  return out;
}

const allFiles = walk(ROOT);
const rel = (p) => posix.normalize(p.slice(ROOT.length + 1).split('\\').join('/'));
const fileSet = new Set(allFiles.map(rel));

// ---------------------------------------------------------------- 1. UTF-8 + read
const contents = new Map();
console.log(`\n[1/7] UTF-8 integrity — ${allFiles.length} Markdown files`);
for (const f of allFiles) {
  try {
    contents.set(rel(f), decoder.decode(readFileSync(f)));
  } catch (e) {
    fail(`${rel(f)} is not valid UTF-8: ${e.message}`);
  }
}
console.log(`  decoded ${contents.size} files`);

// ---------------------------------------------------------------- 2. link helpers
const stripFences = (md) => md.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '');
const LINK_RE = /\[([^\]]*)\]\(\s*<?([^)<>\s]+)>?(?:\s+"[^"]*")?\s*\)/g;
const slug = (s) =>
  s.toLowerCase()
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links in headings → text
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');

function anchorsOf(md) {
  const set = new Set();
  for (const m of md.matchAll(/^#{1,6}\s+(.+)$/gm)) set.add(slug(m[1]));
  return set;
}

// ---------------------------------------------------------------- 3. internal links
console.log('\n[2/7] Internal links and relative paths');
const anchorCache = new Map();
for (const [file, md] of contents) {
  const text = stripFences(md);
  for (const m of text.matchAll(LINK_RE)) {
    const target = m[2];
    if (/^(https?:|mailto:|irc:)/i.test(target)) continue;
    if (target.startsWith('#')) {
      const anchors = anchorCache.get(file) ?? (anchorCache.set(file, anchorsOf(md)), anchorCache.get(file));
      if (!anchors.has(slug(decodeURIComponent(target.slice(1))))) warn(`${file}: self-anchor "${target}" not found in headings`);
      continue;
    }
    const [pathPart, frag] = target.split('#');
    let decoded;
    try { decoded = decodeURIComponent(pathPart); } catch { decoded = pathPart; }
    if (!decoded) continue;
    const resolved = posix.normalize(posix.join(dirname(file), decoded));
    if (!fileSet.has(resolved)) {
      let st = null;
      try { st = statSync(join(ROOT, resolved)); } catch { /* missing */ }
      if (!st) { fail(`${file}: broken link "${target}" (resolved: ${resolved})`); continue; }
      if (st.isDirectory()) { warn(`${file}: link "${target}" resolves to a directory, not a file`); }
      continue; // non-Markdown file target (LICENSE, assets, …) is acceptable
    }
    if (frag) {
      const anchors = anchorCache.get(resolved) ?? (anchorCache.set(resolved, anchorsOf(contents.get(resolved) ?? '')), anchorCache.get(resolved));
      if (!anchors.has(slug(decodeURIComponent(frag)))) warn(`${file}: anchor "${frag}" not found in ${resolved}`);
    }
  }
}
console.log('  link scan complete');

// ---------------------------------------------------------------- 4. lesson parity + structure
console.log('\n[3/7] Lesson parity and structure (10 + 10, sections A–J)');
const LESSON_NAMES = [
  '01-find-an-issue.md', '02-reproduce-a-bug.md', '03-root-cause-analysis.md', '04-minimal-patch.md',
  '05-prove-the-fix.md', '06-open-first-pr.md', '07-write-pr-description.md', '08-handle-review.md',
  '09-debug-ci.md', '10-merge-and-handoff.md',
];
const sections = 'ABCDEFGHIJ'.split('');
for (const locale of ['en', 'zh-CN']) {
  const dir = `lessons/${locale}`;
  const present = [...contents.keys()].filter((f) => f.startsWith(`${dir}/`));
  const names = present.map((f) => f.split('/').pop());
  for (const want of LESSON_NAMES) if (!names.includes(want)) fail(`${dir}: missing lesson ${want}`);
  const extra = names.filter((n) => n !== 'README.md' && !LESSON_NAMES.includes(n));
  if (extra.length) warn(`${dir}: unexpected extra files ${extra.join(', ')}`);
  for (const name of LESSON_NAMES) {
    const file = `${dir}/${name}`;
    const md = contents.get(file);
    if (!md) continue;
    for (const s of sections) if (!new RegExp(`^## ${s}\\.`, 'm').test(md)) fail(`${file}: missing "## ${s}." section`);
    const other = locale === 'en' ? 'zh-CN' : 'en';
    if (!md.includes(`../${other}/${name}`)) fail(`${file}: missing cross-language link to ../${other}/${name}`);
    if (!md.includes('](./README.md)') && !md.includes('](README.md)')) fail(`${file}: missing lesson-index link`);
    const idx = LESSON_NAMES.indexOf(name);
    if (idx < 9 && !md.includes(`./${LESSON_NAMES[idx + 1]}`)) fail(`${file}: missing next-lesson link`);
    if (idx > 0 && !md.includes(`./${LESSON_NAMES[idx - 1]}`)) fail(`${file}: missing previous-lesson link`);
    if (/\bTODO\b/.test(stripFences(md))) warn(`${file}: contains TODO`);
  }
}
console.log('  10 EN + 10 ZH lessons checked');

// ---------------------------------------------------------------- 5. prompts parity + sections
console.log('\n[4/7] CodeX mission parity and required sections');
const MISSION_KEYS = {
  en: ['**Mission', '**Context', '**Inputs', '**Constraints', '**Steps', '**Validation', '**Deliverables', '**Stop conditions'],
  'zh-CN': ['**任务', '**背景', '**输入', '**约束', '**步骤', '**验证', '**交付', '**停止条件'],
};
for (const locale of ['en', 'zh-CN']) {
  const dir = `prompts/${locale}`;
  for (let i = 1; i <= 10; i++) {
    const file = `${dir}/mission-${LESSON_NAMES[i - 1]}`;
    const md = contents.get(file);
    if (!md) { fail(`${file}: missing mission file`); continue; }
    for (const key of MISSION_KEYS[locale]) if (!md.includes(key)) fail(`${file}: missing section "${key}"`);
  }
  if (!contents.has(`${dir}/README.md`)) fail(`${dir}/README.md: missing mission index`);
}
console.log('  10 EN + 10 ZH missions checked');

// ---------------------------------------------------------------- 6. templates/docs parity, case studies, READMEs
console.log('\n[5/7] Templates & docs parity');
const TEMPLATE_NAMES = ['issue-selection.md', 'bug-reproduction.md', 'rca.md', 'patch-plan.md', 'validation-matrix.md',
  'pr-description.md', 'review-response.md', 'ci-triage.md', 'portfolio-handoff.md'];
for (const t of TEMPLATE_NAMES) {
  if (!contents.has(`templates/en/${t}`)) fail(`templates/en/${t}: missing`);
  if (!contents.has(`templates/zh-CN/${t}`)) fail(`templates/zh-CN/${t}: missing`);
}
const DOC_NAMES = ['start-here.md', 'course-map.md', 'glossary.md', 'faq.md', 'cloud-gpu-lab.md', 'editorial-standards.md'];
for (const d of DOC_NAMES) {
  if (!contents.has(`docs/en/${d}`)) fail(`docs/en/${d}: missing`);
  if (!contents.has(`docs/zh-CN/${d}`)) fail(`docs/zh-CN/${d}: missing`);
}

console.log('\n[6/7] Case studies and governance files');
for (const must of [
  'case-studies/README.md', 'case-studies/en/rocm-pr-13437.md', 'case-studies/zh-CN/rocm-pr-13437.md',
  'README.md', 'README.zh-CN.md', 'AGENTS.md', 'CHANGELOG.md', 'ROADMAP.md',
  'CONTRIBUTING.md', 'CONTRIBUTING.zh-CN.md', 'CODE_OF_CONDUCT.md', 'CODE_OF_CONDUCT.zh-CN.md',
  'SECURITY.md', 'SECURITY.zh-CN.md', 'LICENSE', 'LICENSE-CONTENT.md',
  '.github/PULL_REQUEST_TEMPLATE.md', '.github/ISSUE_TEMPLATE/lesson-feedback.md',
]) {
  // LICENSE has no .md extension; existence check via fileSet for .md, fs for others
  if (must.endsWith('.md') ? !contents.has(must) : !existsSync(join(ROOT, must))) fail(`required file missing: ${must}`);
}

console.log('\n[7/7] Language-switch links');
{
  const en = contents.get('README.md') ?? '';
  const zh = contents.get('README.zh-CN.md') ?? '';
  if (!en.includes('](README.zh-CN.md)')) fail('README.md: missing link to README.zh-CN.md');
  if (!zh.includes('](README.md)')) fail('README.zh-CN.md: missing link to README.md');
}

// ---------------------------------------------------------------- summary
console.log('\n=========================================');
const counts = {
  lessons: contents ? LESSON_NAMES.length * 2 : 0,
  missions: 20, templates: 18, docs: 12,
};
console.log(`Files scanned: ${allFiles.length} | lessons: ${counts.lessons} | missions: ${counts.missions} | templates: ${counts.templates} | learner docs: ${counts.docs}`);
if (failures === 0) {
  console.log(`RESULT: PASS (${warnings} warning${warnings === 1 ? '' : 's'})`);
  process.exit(0);
} else {
  console.log(`RESULT: FAIL — ${failures} failure${failures === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'}`);
  process.exit(1);
}
