#!/bin/bash

hostname -I > ip.md
git add .
git commit -m "added IP address to ip.md"
git push
