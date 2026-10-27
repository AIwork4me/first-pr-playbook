"""Reference solution for the Starter Lab.

Try the exercise yourself before reading this file -- the "aha" comes
from making the test pass, not from reading the answer. When you are
done (or genuinely stuck), compare your fix with this one.

Why the original code failed
----------------------------
str.strip() only removes whitespace at the two ENDS of the string.
Everything between the first and last character is left untouched, so
"fix  typo   in docs" kept its extra spaces.

The minimal fix
---------------
str.split() with no arguments splits on ANY run of whitespace (spaces,
tabs, newlines), ignores leading and trailing whitespace by itself, and
" ".join(...) glues the words back together with single spaces. One
line replaces the bug, and every test passes.
"""


def normalize_title(title):
    """Return the title with no leading/trailing whitespace and single
    spaces between words."""
    return " ".join(title.split())
