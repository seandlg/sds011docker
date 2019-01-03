# Minimal web interface for SDS011 air quality sensor
This application makes use of a SDS011 nova PM Sensor and visualizes air quality levels in a minimalistic web interface. The sensor is queried for new data every 15 minutes, which is then saved in a MongoDB database. Another container runs a light nodejs-Webapp, that displays the data in a simple chartjs graph. The entire application is dockerized. The project is further explained in this [Medium article.](https://medium.com/@seandlg/building-a-dockerized-minimal-web-interface-for-a-sds011-air-quality-sensor-ab1ea7467e64 "Building a dockerized minimal web interface for a SDS011 air quality sensor")

## Installation & Usage
### Linux-based OS (x86 instruction set)
Checkout into the `master` branch. Follow instructions there.
### Raspbian (ARMv6 instruction set)
Checkout into the `raspberry` branch. Run the app as follows:
1) Connect the sensor to your USB-port & ensure that it is accessible under /dev/ttyUSB0 (this is standard for many Linux based systems such as Ubuntu).
2) Install dependencies: `pip install pymongo pyserial`
3) Edit `serial.py` && `server.js` and input your mlab database info. Check this [Medium article](https://medium.com/@seandlg/building-a-dockerized-minimal-web-interface-for-a-sds011-air-quality-sensor-ab1ea7467e64 "Building a dockerized minimal web interface for a SDS011 air quality sensor") for an explanation of why this is necessary. Essentially you have to fill in two strings, the database URI ("mongodb://<dbuser>:<dbpassword>@host:port/dbname") and the database name ("dbname").
4) Create a cron job to run `serial.py` every 15 minutes, i.e. `sudo crontab -e` (to edit the root user's crontab) and then add the line `*/15 * * * * /usr/bin/python2.7 /path/to/serial.py`. You will likely need the root priviliges to access `/dev/ttyUSB0`.
5) Install docker and docker-compose:
```
# Add Docker’s official GPG key:
curl -fsSL https://download.docker.com/linux/raspbian/gpg | sudo apt-key add -

# Use the following command to set up the stable repository:
echo "deb [arch=armhf] https://download.docker.com/linux/raspbian stretch stable" | sudo tee /etc/apt/sources.list.d/docker.list

# Update sources and install docker
sudo apt-get update
sudo apt-get install docker-ce=18.06.1~ce~3-0~raspbian

# Install docker-compose
sudo apt-get -y install python-setuptools && sudo easy_install pip  && sudo pip install docker-compose
```
6) Run docker-compose: `sudo docker-compose up -d`
