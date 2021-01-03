#!/bin/bash

PATH=$PATH:/usr/local/bin/

if [[ "$WMSCRIPTS" == "" ]]; then
    export WMSCRIPTS=$(launchctl getenv WMSCRIPTS)
fi

export LC_TIME="en_US.UTF-8"
TIME=$(date +"%I:%M %p")
#DATE=$(date +"%a %m/%d")
DATE=$(date +"%a")

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)
BATTERY_REMAINING=$(pmset -g batt | egrep -o '([0-9]+%).*' | sed 's/attached; //' | cut -d\  -f3)

if [[ "$BATTERY_REMAINING" == "(no" ]]; then
    BATTERY_REMAINING=""
fi


if [[ "$BATTERY_REMAINING" == "charge;" ]]; then
    BATTERY_REMAINING=""
fi

if [[ "$BATTERY_REMAINING" == "not" ]]; then
    BATTERY_REMAINING="not charging"
fi

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

LOAD_AVERAGE=$(sysctl -n vm.loadavg | awk '{print $2}')

WIFI_INTERFACE=en0
WIFI_ACTIVE_INTERFACE=$(route get 8.8.8.8 2>/dev/null | grep interface | cut -c 14-)
WIFI_STATUS=$(ifconfig $WIFI_INTERFACE | grep status | cut -c 10-)
WIFI_SSID=$(networksetup -getairportnetwork $WIFI_INTERFACE | cut -c 24-)

VPN_TUNNELBLICK=$($WMSCRIPTS/vpn_tunnelblick_status.sh)
VPN_PULSESECURE=$($WMSCRIPTS/vpn_pulsesecure_status.sh)

BLUETOOTH_ON=$(blueutil -p)
BLUETOOTH_PAIRED=$(blueutil --paired --format json 2> /dev/null | jq 'map(select(.connected == true))' 2> /dev/null || echo '[]')

AUDIO_INPUT=$(SwitchAudioSource -c -t input)
AUDIO_OUTPUT=$(SwitchAudioSource -c -t output)
AUDIO_MUTED=$(osascript -e "output muted of (get volume settings)")
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
        "ssid": "$WIFI_SSID",
        "active_interface": "$WIFI_ACTIVE_INTERFACE",
        "wifi_interface": "$WIFI_INTERFACE"
    },
    "vpn": {
        "tunnelblick": "$VPN_TUNNELBLICK",
        "pulsesecure": "$VPN_PULSESECURE"
    },
    "bluetooth": {
        "on": "$BLUETOOTH_ON",
        "paired": $BLUETOOTH_PAIRED
    },
    "audio": {
        "input": "$AUDIO_INPUT",
        "output": "$AUDIO_OUTPUT",
        "muted": "$AUDIO_MUTED"
    },
    "dnd": $DND,
    "cgm": $CGM
}
EOF
)
