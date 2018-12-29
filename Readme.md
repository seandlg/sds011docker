This AQI-Sensor project connects to a SDS011 nova PM Sensor & periodically queries it for data. It saves the data in a MongoDB database & runs a light nodejs-Webapp, that displays the data in a simple graph. The entire application is dockerized and ready to deploy.

Run the app as follows:
1) Connect the sensor to your USB-port & ensure that it is accessible under /dev/ttyUSB0 (this is standard for many Linux based systems such as Ubuntu)
2) Run `sudo docker-compose up -d` (from within the DockerAQISensor directory; optionally omit the `-d` if you want to see the logging output of the containers)
3) Open a browser and type in "localhost" into the address bar
