#!/bin/bash

PATH=$PATH:/usr/local/bin/

if [[ "$WMSCRIPTS" == "" ]]; then
    export WMSCRIPTS=$(launchctl getenv WMSCRIPTS)
fi

$WMSCRIPTS/nibar-status-json/main