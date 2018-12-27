# Use an official node runtime as a parent image
FROM node:8

# Create app directory
WORKDIR /app

# Copy sources and install dependencies
COPY ./app /app

RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
