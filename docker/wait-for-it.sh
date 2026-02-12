#!/usr/bin/env sh
# wait-for-it.sh - Wait for a TCP host/port to become available
# Compatible with sh (no bash needed)

HOST="$1"
PORT="$2"
shift 2

# Default timeout in seconds (optional)
TIMEOUT=30

echo "Waiting for $HOST:$PORT..."

# Wait loop
i=0
while ! nc -z "$HOST" "$PORT"; do
  i=$((i + 1))
  if [ "$i" -ge "$TIMEOUT" ]; then
    echo "Timeout waiting for $HOST:$PORT"
    exit 1
  fi
  sleep 1
done

echo "$HOST:$PORT is available, running command..."

# Run the rest of the command
exec "$@"
