# Case Studies & Evidence Index

- [English case study — ROCm PR #13437](en/rocm-pr-13437.md)
- [中文案例研究 — ROCm PR #13437](zh-CN/rocm-pr-13437.md)

## Evidence index (all links verified against the GitHub API on 2026-10-27)

| # | Evidence | URL | Verified fact |
|---|---|---|---|
| 1 | Upstream PR | https://github.com/ROCm/rocm-libraries/pull/13437 | Title "MIOpen: make HIPRTC kernel includes self-contained without host STL"; merged 2026-10-19T09:27:09Z; base `develop`; head `AIwork4me/rocm-libraries`; 7 files, +317/−21 |
| 2 | Original user issue | https://github.com/ROCm/MIOpen/issues/3956 | "Running BatchNorm2D causes miopenStatusUnknownError"; created 2026-04-22; closed |
| 3 | Review round 1 | https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5489844163 | By `averinevg`, 2026-10-12, body notes "First pass below is an automated AI review"; inline comments: AMD copyright, existing gtest, external-repo comments |
| 4 | Review round 2 | https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5502061602 | 2026-10-13; merge freestanding headers, drop HIP<7, trivial inline-kernel test |
| 5 | Approval (round 3) | https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370 | APPROVED 2026-10-16; "LGTM, thanks! Will merge once CI is green." |
| 6 | CI evidence comment | https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811 | By author, 2026-10-16; seven major CI workflows green on `d4b574ac` |
| 7 | Human-responsibility comment | https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225928183 | By author, 2026-10-16; human directed, CodeX assisted |
| 8 | TheRock integration | https://github.com/ROCm/TheRock/pull/9359 | "Bump rocm-libraries from cb26189 to d875648"; merged 2026-10-20T23:15:52Z |
| 9 | Independent evidence repository | https://github.com/AIwork4me/Ultralytics-Windows-ROCm-Training-RCA | Public; "Evidence-first RCA of Ultralytics YOLO training failure on Windows ROCm, Ryzen AI MAX+ PRO 395 / gfx1151" |

Verification method: `gh api` queries against `repos/ROCm/rocm-libraries/pulls/13437`, its reviews and inline comments, `repos/ROCm/MIOpen/issues/3956`, `repos/ROCm/TheRock/pulls/9359`, and `repos/AIwork4me/Ultralytics-Windows-ROCm-Training-RCA`. Quoted phrases above appear verbatim in the fetched records.

## Boundaries that apply to every row

- One tested GPU architecture (gfx1151 on Windows 11) does not cover all GPUs.
- Linux results do not prove Windows behavior.
- FP32 YOLO training success is not AMP training success.
- Merged-in-`develop` does not mean shipped in every release.
