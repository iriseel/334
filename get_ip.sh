#!/bin/bash

ip_address=$(hostname -I)
echo "current IP address is: $ip_address"
hostname -I > ~/git/334/raspberrypi/ip.md
git add .
git commit -m "added IP address to ip.md"
git push

scp ~/git/334/raspberrypi/ip.md sirilee@172.27.111.151:~/Desktop
