Description of the project: I created a website with html, css, and js. Every second, a new heart pops up at a random location on screen and with a random starting color. Then, its color proceeds to change from the initial state. Whenever there are more than 9 hearts, one pre-existing heart is removed to make space for a new one. Moreover, when a second passes, all the hearts on screen spin. As a result, the website is always in a state of change. The website responds to the browser size by having all units in terms of viewport width and height.

Instructions on implementation: Once you have copies of both the index.html file and the open_html.py, make the Python script executable by running the following command:
    chmod +x open_html.py

Then configure the Raspberry Pi to run the script on boot. First, you need to edit its rc.local file:
    sudo nano /etc/rc.local
And add the following code before the "exit 0" line:
    /path/to/open_html.py &

Then, you just save the rc.local file and exit the text editor. Then, reboot your Raspberry Pi:
    sudo reboot


