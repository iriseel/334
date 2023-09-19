#!/usr/bin/env python3

import webbrowser
import subprocess

# Path to the local HTML file
file_path = "index.html"

# Command to open Chromium in fullscreen mode
chromium_command = [
    "chromium-browser",
    "--kiosk",           # Start in kiosk (fullscreen) mode
    "--noerrdialogs",    # Disable error dialogs
    "--disable-infobars", # Disable infobars (e.g., "Chrome is being controlled by automated software")
    file_path        # Path to your local HTML file
]

# Run the Chromium command
subprocess.Popen(chromium_command)

