#!/bin/bash

echo hostname-I
hostname -I > ~/git/334/raspberrypi/ip.md
git add .
git commit -m "added IP address to ip.md"
git push
