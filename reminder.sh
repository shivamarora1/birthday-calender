#!/bin/bash
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <date> <endpoint> <api_key>"
    exit 1
fi

date="$1"
endpoint="$2"
api_key="$3"

api_result=$(curl -s -H "Api-Key: $api_key" "${endpoint}/api/events/reminder?date=${date}")

if [ $? -ne 0 ]; then
    echo "Error: Failed to make API call"
    exit 1
fi

if [[ $(echo "$api_result" | jq '.[]') ]]; then
    echo "Error: API returned non-empty array"
    exit 1
fi

echo "API call successful!"            

# This script will raise error if birthday api returns entry.
# On error gitaction workflow will send mail and this will act like a email reminder.