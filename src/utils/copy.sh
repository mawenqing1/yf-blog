#!/bin/sh

cd /Users/mawenqing/Documents/xfw/yf-blog/src/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log