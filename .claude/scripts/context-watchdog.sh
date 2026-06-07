#!/usr/bin/env bash
COUNTER_FILE=".claude/.prompt_counter"
COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo 0)
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNTER_FILE"
if [ $((COUNT % 20)) -eq 0 ]; then
  echo "▶ [watchdog] $COUNT prompts en esta sesión. Revisa /context — si >60% usa /compact."
fi
if [ $((COUNT % 50)) -eq 0 ]; then
  echo "▶ [watchdog] $COUNT prompts. Si cambias de tarea usa /clear."
fi
exit 0
