#!/usr/bin/env python
# Module: Manage
# Description: Django command-line utility for administrative tasks
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation.

import os
import sys


def main() -> None:
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
