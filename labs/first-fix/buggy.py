"""Bug-fix practice module for the 15-minute Starter Lab.

normalize_title() cleans up an issue title before it is stored.
The current implementation has a real bug: it removes whitespace at
the START and END of the title, but keeps repeated whitespace INSIDE
the title.

Your job: make the tests in run_tests.py pass with the smallest
change you can. Do not change run_tests.py.
"""


def normalize_title(title):
    """Return a cleaned-up issue title.

    Expected behavior: no leading or trailing whitespace, and single
    spaces between words.
    """
    return title.strip()
