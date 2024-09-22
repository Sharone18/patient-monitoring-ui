# Use the official OpenJDK 17 base image
FROM openjdk:17-jdk-slim as base

# Install Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Nginx configuration file (if you have a custom configuration)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the ports for Nginx and your application (if needed)
EXPOSE 80 8080

# Start Nginx and run your application
CMD service nginx start && tail -f /dev/null
