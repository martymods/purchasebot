const { chromium } = require('playwright');
require('dotenv').config();

async function runBot(data) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.TARGET_URL);

  // LOGIN
  await page.fill('input[name="email"]', process.env.LOGIN_EMAIL);
  await page.fill('input[name="password"]', process.env.LOGIN_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // DATE PICKER
  await page.click('#calendarButton');
  await page.click(`text="${data.date}"`); // e.g. "March 30, 2025"

  // CHECKOUT
  await page.fill('input[name="cardNumber"]', process.env.CARD_NUMBER);
  await page.fill('input[name="cardExpiry"]', process.env.CARD_EXPIRY);
  await page.fill('input[name="cardCvc"]', process.env.CARD_CVC);

  // CAPTCHA (optional)
  if (await page.$('.captcha-class')) {
    console.log('CAPTCHA detected!');
    // Add CAPTCHA handling here if needed
  }

  await page.click('button[type="submit"]'); // Confirm purchase
  await page.waitForTimeout(5000); // Let confirmation complete

  await browser.close();
}

module.exports = { runBot };
