# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Make sure cron is installed
RUN apt-get update && apt-get -y install cron

# Add crontab file in the cron directory
ADD ./app/crontab /etc/cron.d/hello-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/hello-cron

# Apply cron job
RUN crontab /etc/cron.d/hello-cron

# Set the working directory to /app
WORKDIR /app

# Copy the contents of the directory app into the container at /app
COPY ./app/* /app/

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Run the command on container startup
CMD ["cron", "-f"]
