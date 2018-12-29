# Use an official node runtime as a parent image
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy sources and install dependencies
COPY ./app /app

RUN npm install
RUN npm install -g nodemon@1.18.9

EXPOSE 8080
CMD ["nodemon", "server.js"]
