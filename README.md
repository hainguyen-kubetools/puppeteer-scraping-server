# Puppeteer Scraping Server

A Node.js server that uses Puppeteer to fetch and return the HTML content of any web page. Built with Express and puppeteer-real-browser.

## Features

- Web scraping endpoint that returns full HTML content
- Support for both local and Docker deployment
- Automatic Chrome/Chromium path detection
- Error handling and timeout management

## Prerequisites

- Node.js 18 or higher
- Chrome or Chromium browser
- Docker (optional, for containerized deployment)

## Installation

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/hainguyen-kubetools/puppeteer-scraping-server.git
cd puppeteer-scraping-server
```

2. Install dependencies:
```bash
npm install
```

3. Install Chrome package:
```bash
npm install chrome
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

5. Run the server permanently on VM:
```bash
npm install -g pm2
pm2 start server.js --name puppeteer-service
pm2 startup
pm2 save
```
### Docker Setup

#### Using Docker Compose (Recommended)
```bash
docker-compose up --build
```

#### Using Docker directly
```bash
docker build -t my-puppeteer-service .
docker run -p 3000:3000 my-puppeteer-service
```

## Usage

Send a GET request to the `/get-page` endpoint with a `url` query parameter:

```
GET http://localhost:3000/get-page?url=https://example.com
```

### Example using cURL:
```bash
curl "http://localhost:3000/get-page?url=https://example.com"
```

### Example using JavaScript fetch:
```javascript
fetch('http://localhost:3000/get-page?url=https://example.com')
  .then(response => response.text())
  .then(html => console.log(html))
  .catch(error => console.error(error));
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`: Skip Chromium download in Docker (set to true)

## Error Handling

The server will return:
- 400 status code for missing URL parameter
- 500 status code for server-side errors with error details
- Successful responses will contain the HTML content of the requested page

## Docker Notes

- The Docker setup includes all necessary dependencies for running Chrome/Chromium
- Uses node:18-slim as the base image
- Includes proper security flags for running Puppeteer in a container

