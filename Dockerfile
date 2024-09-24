# Use the official Nginx image as a base
FROM nginx:alpine

# Copy the built Angular files from the dist folder to Nginx's html folder
COPY ./dist/ecg-waveform /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
