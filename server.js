const express = require("express");
const { connect } = require("puppeteer-real-browser");

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-page', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing URL query parameter. Use: /get-page?url=https://example.com');
  }
  try {
    const { browser, page } = await connect({
      headless: false,
      args: [],
      customConfig: {},
      turnstile: true,
      connectOption: {},
      disableXvfb: false,
      ignoreAllFlags: false,
    });

    // Increase the navigation timeout by setting timeout to 60000 ms (or adjust as needed)
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
