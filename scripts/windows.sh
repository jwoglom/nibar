#!/bin/sh

PATH=/usr/local/bin/:$PATH

# Check if yabai exists
if ! [ -x "$(command -v yabai)" ]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi

CURRENT_WINDOW=$(yabai -m query --windows --window 2>/dev/null || echo '{}')
#WINDOWS=$(yabai -m query --windows --space mouse || echo '[]')

echo $(cat <<-EOF
{
  "windows": [$CURRENT_WINDOW]
}
EOF
)
