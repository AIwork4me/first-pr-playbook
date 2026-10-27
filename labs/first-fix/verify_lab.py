#!/usr/bin/env python3
"""Verification harness for labs/first-fix (maintainers and CI only).

Learners do not need this file -- see README.md in this folder.

The lab ships with an INTENTIONALLY buggy baseline. A naive test run
would therefore "fail", and a naive CI gate would report a broken
release. This harness proves the lab is healthy by checking, in a
temporary working directory, that:

  1. BASELINE  : buggy.py fails the tests with the expected assertion
                 failure (clean FAIL, no crash/ERROR).
  2. SOLUTION  : solutions/reference_solution.py passes the same tests.
  3. SELF-TEST : corrupted baselines (a crash, or an unexpectedly green
                 baseline) are correctly REJECTED and never mistaken
                 for the expected red state.

Exit code 0 only if every executed check passes. Standard library only.
Usage:
    python verify_lab.py             # checks 1 and 2
    python verify_lab.py --self-test # checks 1, 2 and 3 (CI uses this)
"""

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

LAB_DIR = Path(__file__).resolve().parent
BUGGY = LAB_DIR / "buggy.py"
TESTS = LAB_DIR / "run_tests.py"
SOLUTION = LAB_DIR / "solutions" / "reference_solution.py"

# The test that must be RED on the untouched baseline.
EXPECTED_RED_TEST = "test_strips_and_collapses_inner_spaces"

CRASHING_MODULE = '''\
def normalize_title(title):
    raise RuntimeError("simulated unrelated crash")
'''


def run_tests(workdir):
    """Run run_tests.py inside workdir; return (exit_code, combined_output)."""
    proc = subprocess.run(
        [sys.executable, "run_tests.py"],
        cwd=str(workdir),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    return proc.returncode, proc.stdout + proc.stderr


def classify_baseline(returncode, output):
    """Classify a baseline test run.

    EXPECTED_RED          -> the intentional bug, failing cleanly
    UNEXPECTED_PASS       -> baseline is green; the exercise is broken
    UNEXPECTED_FAILURE    -> crash or wrong failure; not the exercise
    """
    has_expected_fail = f"FAIL: {EXPECTED_RED_TEST}" in output
    has_error = re.search(r"^ERROR:", output, re.MULTILINE) is not None
    if returncode != 0 and has_expected_fail and not has_error:
        return "EXPECTED_RED"
    if returncode == 0:
        return "UNEXPECTED_PASS"
    return "UNEXPECTED_FAILURE"


def make_copy(parent, name, module_source):
    """Create an isolated copy of the lab with a chosen buggy.py."""
    workdir = Path(parent) / name
    workdir.mkdir()
    shutil.copyfile(TESTS, workdir / "run_tests.py")
    if Path(module_source).is_file():
        shutil.copyfile(module_source, workdir / "buggy.py")
    else:
        (workdir / "buggy.py").write_text(module_source, encoding="utf-8")
    return workdir


class Results:
    def __init__(self):
        self.failed = 0

    def check(self, ok, label, detail=""):
        status = "PASS" if ok else "FAIL"
        print(f"  [{status}] {label}" + (f" -- {detail}" if detail and not ok else ""))
        if not ok:
            self.failed += 1


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--self-test", action="store_true",
                        help="also verify that broken baselines are rejected")
    args = parser.parse_args()

    print(f"verify_lab: python {sys.version.split()[0]} on {sys.platform}")
    results = Results()

    with tempfile.TemporaryDirectory(prefix="first-fix-lab-") as tmp:
        # -- 1. baseline must be red, and red for the RIGHT reason ----
        baseline_dir = make_copy(tmp, "baseline", BUGGY)
        code, output = run_tests(baseline_dir)
        verdict = classify_baseline(code, output)
        results.check(verdict == "EXPECTED_RED",
                      "baseline fails with the expected assertion",
                      f"classified {verdict}, exit {code}")
        results.check("FAILED" in output and f"FAIL: {EXPECTED_RED_TEST}" in output,
                      "expected test is reported FAIL by unittest")

        # -- 2. reference solution must be green on the same tests ----
        solution_dir = make_copy(tmp, "solution", SOLUTION)
        code, output = run_tests(solution_dir)
        results.check(code == 0 and "OK" in output,
                      "reference solution passes the same tests",
                      f"exit {code}")

        # -- 3. self-test: unrelated failures must be rejected --------
        if args.self_test:
            crash_dir = make_copy(tmp, "selftest-crash", CRASHING_MODULE)
            code, output = run_tests(crash_dir)
            verdict = classify_baseline(code, output)
            results.check(verdict == "UNEXPECTED_FAILURE",
                          "simulated crash is rejected as UNEXPECTED_FAILURE",
                          f"classified {verdict}, exit {code}")

            green_dir = make_copy(tmp, "selftest-false-green", SOLUTION)
            code, output = run_tests(green_dir)
            verdict = classify_baseline(code, output)
            results.check(verdict == "UNEXPECTED_PASS",
                          "unexpectedly green baseline is rejected",
                          f"classified {verdict}, exit {code}")

    if results.failed:
        print(f"verify_lab: FAIL ({results.failed} check(s) failed)")
        return 1
    print("verify_lab: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
