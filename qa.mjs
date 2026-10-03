import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.toString()));
  page.on('requestfailed', request => {
    errors.push('Request failed: ' + request.url() + ' ' + request.failure().errorText);
  });

  console.log('Navigating to http://localhost:3006...');
  try {
    await page.goto('http://localhost:3006', { waitUntil: 'networkidle0', timeout: 30000 });
  } catch (e) {
    console.log('Error navigating:', e);
  }

  console.log('Taking screenshot at 0%...');
  await page.screenshot({ path: 'screenshot_0.png' });

  for (let i = 1; i <= 5; i++) {
    const y = i * 800;
    console.log(`Scrolling to ${y}...`);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    // wait for drawing
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `screenshot_${y}.png` });
  }

  // Reverse scroll check
  for (let i = 4; i >= 0; i--) {
    const y = i * 800;
    console.log(`Reverse scrolling to ${y}...`);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('Errors:', errors);

  await browser.close();
})();
