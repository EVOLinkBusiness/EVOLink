#!/usr/bin/env bash
DIRTY=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
if [ "$DIRTY" -gt 10 ]; then
  echo "▶ [git] $DIRTY archivos sin commit. Considera commit antes de seguir."
fi
exit 0
