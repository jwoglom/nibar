#!/bin/bash

PATH=$PATH:/usr/local/bin/

export LC_TIME="en_US.UTF-8"
TIME=$(date +"%H:%M")
DATE=$(date +"%a %m/%d")

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)
BATTERY_REMAINING=$(pmset -g batt | egrep -o '([0-9]+%).*' | cut -d\  -f3)

if [[ "$BATTERY_REMAINING" == "(no" ]]; then
    BATTERY_REMAINING=""
fi


if [[ "$BATTERY_REMAINING" == "charge;" ]]; then
    BATTERY_REMAINING=""
fi

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

LOAD_AVERAGE=$(sysctl -n vm.loadavg | awk '{print $2}')

WIFI_STATUS=$(ifconfig en0 | grep status | cut -c 10-)
WIFI_SSID=$(networksetup -getairportnetwork en0 | cut -c 24-)

AUDIO_INPUT=$(SwitchAudioSource -c -t input)
AUDIO_OUTPUT=$(SwitchAudioSource -c -t output)

DND=$(defaults -currentHost read com.apple.notificationcenterui doNotDisturb)

if [ ! -f ~/.cache/cgm.json ]; then
    $WMSCRIPTS/update_cgm.sh
else
    $WMSCRIPTS/update_cgm_check.sh
fi
CGM=$(cat ~/.cache/cgm.json 2> /dev/null || echo "{}")

echo $(cat <<-EOF
{
    "datetime": {
        "time": "$TIME",
        "date": "$DATE"
    },
    "battery": {
        "percentage": $BATTERY_PERCENTAGE,
        "charging": $BATTERY_CHARGING,
        "remaining": "$BATTERY_REMAINING"
    },
    "cpu": {
        "loadAverage": $LOAD_AVERAGE
    },
    "wifi": {
        "status": "$WIFI_STATUS",
        "ssid": "$WIFI_SSID"
    },
    "audio": {
        "input": "$AUDIO_INPUT",
        "output": "$AUDIO_OUTPUT"
    },
    "dnd": $DND,
    "cgm": $CGM
}
EOF
)
