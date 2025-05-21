const express = require("express");
const { connect } = require("puppeteer-real-browser");

const app = express();
const PORT = process.env.PORT || 3000;

// Define Chrome paths with fallbacks for Linux
const CHROME_PATHS = [
    // Windows paths
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    // Linux paths
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable'
];

// Function to check if file exists
const findChromePath = () => {
  const fs = require('fs');
  for (const path of CHROME_PATHS) {
    if (fs.existsSync(path)) {
      return path;
    }
  }
  throw new Error('Chrome/Chromium not found. Please install Chrome or Chromium browser.');
};

app.get('/get-page', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing URL query parameter. Use: /get-page?url=https://example.com');
  }
  try {
    const chromePath = findChromePath();
    const { browser, page } = await connect({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      customConfig: {
        executablePath: chromePath
      },
      turnstile: true,
      connectOption: {},
      disableXvfb: false,
      ignoreAllFlags: false,
    });

    await page.goto(targetUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    const content = await page.content();
    await browser.close();
    res.send(content);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`Error occurred: ${error.toString()}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});