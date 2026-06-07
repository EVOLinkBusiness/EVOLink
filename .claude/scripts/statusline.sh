#!/usr/bin/env bash
BRANCH=$(git branch --show-current 2>/dev/null || echo "no-git")
COUNT=$(cat .claude/.prompt_counter 2>/dev/null || echo 0)
DIRTY=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
echo "[$BRANCH] prompts:$COUNT dirty:$DIRTY"
exit 0
