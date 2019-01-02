# Minimal web interface for SDS011 air quality sensor
This application connects to a SDS011 nova PM Sensor and visualizes air quality levels in a minimalistic web interface. The sensor is queried for new data every 15 minutes, which is then saved in a MongoDB database. Another container runs a light nodejs-Webapp, that displays the data in a simple chartjs graph. The entire application is dockerized. The project is further explained in this [Medium article](https://medium.com/@seandlg/building-a-dockerized-minimal-web-interface-for-a-sds011-air-quality-sensor-ab1ea7467e64 "Building a dockerized minimal web interface for a SDS011 air quality sensor")

## Installation & Usage
### Linux-based OS (x86 instruction set)
Checkout into the `master` branch. Run the app as follows:
1) Connect the sensor to your USB-port & ensure that it is accessible under `/dev/ttyUSB0` (this is standard for many Linux based systems such as Ubuntu)
2) Run `sudo docker-compose up -d` (from within the sds011docker directory; optionally omit the `-d` if you want to see the logging output of the containers)
3) Open a browser and type in "localhost" into the address bar
### Raspbian (ARMv6 instruction set)
Checkout into the `raspberry` branch. Run the app as follows:
1) Follow step 1 from the Linux-based OS installation above. Then install dependencies: `pip install pymongo pyserial`
2) Create a cron job to run `serial.py` every 15 minutes, i.e. `sudo crontab -e` (to edit the root user's crontab) and then add the line `*/15 * * * * /usr/bin/python2.7 /path/to/serial.py`. You will likely need the root priviliges to access `/dev/ttyUSB0`.
3) Run docker-compose: `sudo docker-compose up -d`
