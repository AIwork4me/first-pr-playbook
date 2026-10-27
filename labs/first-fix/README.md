# Starter Lab — Fix Your First Bug (about 15 minutes)

**[简体中文版](README.zh-CN.md)**

This is a self-contained, hands-on exercise for absolute beginners. You will run a real test, watch it fail, understand why, apply a minimal fix, and watch it pass — the same red → green discipline the whole [First PR Playbook](../../README.md) course teaches, shrunk into one small Python function.

No GPU, no account, no AI assistant, no network, and no installed packages are required. Only Python itself.

```text
Open the lab → run a small program → observe a real failing test →
understand the failure → apply a minimal fix → run the test again →
see PASS → understand what changed and why
```

**Timing.** The exercise is **designed to take about 15 minutes *after* Python is installed** — that is a goal to aim for, not a promise about your pace. If you still need to install Python, allow an extra 10–20 minutes — a one-time setup cost, not part of the exercise. Taking longer is completely fine; the goal is understanding, not speed.

## Step 1 — Prepare: check that Python is available

You need Python 3.8 or newer, once, on any of Windows, macOS, or Linux.

Check what you have (run the command for your operating system in a terminal — PowerShell on Windows, Terminal on macOS, any shell on Linux):

```bash
py --version          # Windows (the "py" launcher)
python3 --version     # macOS / Linux
python --version      # some systems (mainly Windows) also have this
```

If one of these prints something like `Python 3.11.4`, you are ready. If every command reports "command not found" (or Windows asks which app to open `.py` with), install Python from [python.org](https://www.python.org/downloads/) — on Windows, tick **"Add python.exe to PATH"** in the installer — then reopen your terminal and check again.

## Step 2 — Run the failing test

**Get the lab files first — no Git and no GitHub account needed:**

1. In your browser, open this repository's page on GitHub and click the green **`<> Code`** button, then **Download ZIP**.
2. Find the downloaded `first-pr-playbook-main.zip` (usually in your Downloads folder) and extract it: Windows — right-click → **Extract All…**; macOS — double-click the ZIP; Linux — run `unzip first-pr-playbook-main.zip`.
3. The extracted folder is named **`first-pr-playbook-main`** (GitHub appends the branch name). This folder — the one containing the course's top-level `README.md` and a `labs/` directory — is "the repository folder" in the commands below. (If you already cloned the repository with Git, you already have these files.)

Now open a terminal and move into the lab folder, then run the tests:

```bash
# Windows (PowerShell)
cd ~\Downloads\first-pr-playbook-main     # skip this line if your terminal already
cd labs\first-fix                        # opened inside the extracted folder
py run_tests.py

# macOS / Linux
cd ~/Downloads/first-pr-playbook-main    # skip this line if your terminal already
cd labs/first-fix                        # opened inside the extracted folder
python3 run_tests.py
```

Windows tip: in File Explorer, Shift+right-click the extracted `first-pr-playbook-main` folder and choose **Open PowerShell window here** (Windows 10) or **Open in Terminal** (Windows 11) — then start at `cd labs\first-fix`.

**Before you press Enter — predict.** The lab file `buggy.py` contains `normalize_title("  fix  typo   in docs  ")`. What string do you think comes back? Write your guess down, then run.

Illustrative output (yours will look similar; file paths will differ):

```text
test_already_normalized_title_is_unchanged ... ok
test_collapses_tabs_and_newlines_to_single_spaces ... FAIL
test_strips_and_collapses_inner_spaces ... FAIL
test_whitespace_only_title_becomes_empty ... ok

======================================================================
FAIL: test_strips_and_collapses_inner_spaces
----------------------------------------------------------------------
AssertionError: 'fix  typo   in docs' != 'fix typo in docs'
- fix  typo   in docs
?    -      --
+ fix typo in docs

----------------------------------------------------------------------
Ran 4 tests in 0.001s

FAILED (failures=2)
```

Two tests **failed**. This is not a broken installation — this is the lab working as designed. You are looking at a genuine red test.

## Step 3 — Understand the failure

**Predict first:** before reading on, can you tell from the `AssertionError` line alone what the function returned instead of the expected value?

Now open `buggy.py` in your editor and read it. The whole function is one line: `return title.strip()`. Compare the three parts of the failure:

- **Expected** (what the test demands): `'fix typo in docs'` — single spaces between words.
- **Actual** (what the code produced): `'fix  typo   in docs'` — the extra inner spaces survived.
- **Why:** Python's `str.strip()` removes whitespace only at the two *ends* of a string. The leading `"  "` and trailing `"  "` were removed correctly — but everything *between* the first and last character is untouched. One bug, two failing tests: the tabs/newlines test fails for the same reason.

Open `run_tests.py` too and find the line that produced the failure. Notice what a test actually is: a claim that "this input must produce this output", checked by machine — not an opinion.

## Step 4 — Fix the bug

**Predict first:** what is the *smallest* change that could solve this problem? (Rule: you may edit `buggy.py`, but never `run_tests.py` — the tests are the specification.)

**Path A — with an AI coding assistant.** Give it this prompt, then review what it does before accepting anything:

```text
I am in labs/first-fix of the first-pr-playbook repository. The function
normalize_title() in buggy.py has a bug: run_tests.py reports two failing
tests. Read buggy.py and run_tests.py, and explain in plain words what the
current implementation actually does. Then propose the smallest possible
change to buggy.py that makes all four tests pass. Do not modify
run_tests.py. Do not claim success unless you actually ran the test
command and it printed OK -- show me the real output.
```

**Path B — by hand.** Try it yourself first; take the hints one at a time only if stuck:

1. Re-read the `AssertionError`: which characters must disappear?
2. Ask what `"fix  typo   in docs".split()` returns. Try it live: `py -c "print('fix  typo   in docs'.split())"` (Windows) or `python3 -c "print('fix  typo   in docs'.split())"` (macOS/Linux).
3. If a list of words appears: how do you join a list back into one string with single spaces?
4. Still stuck? The explained reference answer is in [solutions/reference_solution.py](solutions/reference_solution.py) — read the explanation there, then type the fix yourself anyway.

## Step 5 — Verify the fix

Run **exactly the same command** as in Step 2:

```bash
py run_tests.py          # Windows
python3 run_tests.py     # macOS / Linux
```

Illustrative output:

```text
test_already_normalized_title_is_unchanged ... ok
test_collapses_tabs_and_newlines_to_single_spaces ... ok
test_strips_and_collapses_inner_spaces ... ok
test_whitespace_only_title_becomes_empty ... ok

----------------------------------------------------------------------
Ran 4 tests in 0.001s

OK
```

That final `OK` is your evidence. **How do we know the fix worked without merely trusting the AI assistant (or ourselves)?** Because the same four tests that failed before now pass — same command, same test file, unchanged. Nothing was simulated or hard-coded: the tests were written before you touched the code, and you were not allowed to edit them.

If the output is still red, that is normal engineering, not failure: re-read the new `AssertionError` (did you save the file? any typo?), adjust, and rerun.

## Step 6 — Celebrate: write your three-sentence summary

You just completed a real red → green cycle. Lock it in by writing three sentences in your learning log:

1. **The bug:** *`normalize_title()` only removed whitespace at the two ends of the string, so repeated spaces inside the title survived.*
2. **The fix:** *I replaced `title.strip()` with `" ".join(title.split())`, which splits on any run of whitespace and rejoins with single spaces.*
3. **The evidence:** *`run_tests.py` reported 2 FAIL / 2 ok before the fix and `OK (4 tests)` after — same command, same unchanged tests.*

If you can write those three sentences in your own words, you did not just pass a tutorial — you practiced the exact skill open-source reviewers care about: claim, change, proof.

## Step 7 — Continue learning

- Next: [Lesson 01 — Find your first real issue](../../lessons/en/01-find-an-issue.md), where you pick a genuine problem in a project you use.
- After Lesson 01, and before [Lesson 02](../../lessons/en/02-reproduce-a-bug.md), read the [Git Quickstart](../../docs/en/git-quickstart.md) — the short Git survival guide this course expects from Lesson 02 onward.
- Full orientation: [Start here](../../docs/en/start-here.md).

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| `python`/`py`/`python3` is not recognized | Python not installed or not on PATH. Reinstall from [python.org](https://www.python.org/downloads/); on Windows tick **Add python.exe to PATH**; reopen the terminal. On Windows prefer the `py` launcher. |
| Which command — `python`, `python3`, or `py`? | Windows: try `py` first, then `python`. macOS/Linux: use `python3`. Whichever prints a version with Step 1's command is yours. |
| `can't open file 'run_tests.py'` or `No such file or directory` | Wrong working directory. Run `cd` alone (Windows: `cd`; macOS/Linux: `pwd`) to see where you are, then `cd` into `labs/first-fix` inside the downloaded repository folder. |
| `ModuleNotFoundError: No module named 'buggy'` | You ran the tests from outside the lab folder. Both files must sit next to each other — `cd labs\first-fix` (Windows) or `cd labs/first-fix` (macOS/Linux) and rerun. |
| `Ran 0 tests` / test seems not discovered | You are probably using `python -m unittest discover` or similar. Don't — run the file directly: `py run_tests.py` / `python3 run_tests.py`. (The test file is named `run_tests.py` on purpose so automated test discovery elsewhere in the repository does not pick it up.) |
| Editing `buggy.py` reports a syntax error | A typo (missing quote, bracket, or colon). The error message names the line number; compare your line with the original `return title.strip()` line. |
| Baseline is unexpectedly green (all `ok` on the first run) | `buggy.py` was already fixed — maybe by you or an AI assistant earlier. Restore the intended starting point: from the repository root run `git checkout -- labs/first-fix/buggy.py` (or re-download the repository), then start again at Step 2. |
| Your fix runs but tests still fail | Read the new `AssertionError` — it tells you exactly what came out vs. what was expected. Check that you saved the file, edited `buggy.py` (not a copy), and did not edit `run_tests.py`. |

## For maintainers: how this lab stays CI-safe

The failing baseline is **intentional** — do not "fix" `buggy.py` in the canonical repository; that would delete the exercise. Two protections keep normal CI green:

1. The test file is named `run_tests.py`, which matches neither pytest's default patterns (`test_*.py`, `*_test.py`) nor `unittest discover`'s (`test*.py`), so no standard bulk test run trips over the intentional failure.
2. [verify_lab.py](verify_lab.py) validates the lab *inside a temporary directory*: it asserts the baseline fails with exactly the expected assertion, the [reference solution](solutions/reference_solution.py) passes the same tests, and corrupted states (crashes, unexpectedly green baselines) are rejected. CI runs `python labs/first-fix/verify_lab.py --self-test`.
