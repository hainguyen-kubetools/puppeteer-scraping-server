# Use an official Node runtime as the base image
FROM node:18-slim

# Install OS dependencies, xvfb, and Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    xdg-utils \
    xvfb \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set the CHROME_PATH environment variable to point to the Chromium executable
ENV CHROME_PATH=/usr/bin/chromium

# Set the working directory
WORKDIR /app

# Copy package files and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Expose port 3000 for your Express server
EXPOSE 3000

# Start the server using nodemon for auto-restart on file changes (if configured)
CMD ["npm", "run", "dev"]
