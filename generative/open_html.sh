#!/bin/bash

# Wait for the X server to start (adjust the sleep time as needed)
sleep 1

# Open Chromium in kiosk mode with your HTML file
chromium-browser --kiosk "file:///home/student334/git/334/generative/index.html"
