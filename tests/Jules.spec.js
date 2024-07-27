const { test, expect } = require('@playwright/test');
const path = require('path');


test.describe('Login Functionality Tests', () => {
  const url = 'https://demo.haroldwaste.com/';
  const validEmail = 'qa@julesai.com';
  const validPassword = 'QaJULES2023!';
  const screenshotDir = 'FailedScreenshot';
  const screenshotDir1 = 'PassedScreenshot';

  test.beforeEach(async ({ page }) => {
      await page.goto(url);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {

      const screenshotPath = path.join(screenshotDir, `${testInfo.title.replace(/\s+/g, '_')}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
    else{
        const screenshotPath = path.join(screenshotDir1, `${testInfo.title.replace(/\s+/g, '_')}.png`);
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved: ${screenshotPath}`);
    }
});

  test('Url Validation', async ({  page }) => {

    await page.locator("input[name='email']").fill(validEmail);
    await page.locator("input[name='password']").fill(validPassword);
    await page.locator("button[type='submit']").click();

    await expect(page).toHaveURL('https://demo.haroldwaste.com/purchases');
  });


  test('Invalid Email', async ({  page }) => {

    await page.locator("input[name='email']").fill("qa@hahha.com");
    await page.locator("input[name='password']").fill("QaJULES2023!");
    await page.locator("button[type='submit']").click();

    await expect(page).toHaveURL('https://demo.haroldwaste.com/purchases');
  });

  test('Invalid Password', async ({  page }) => {

    await page.locator("input[name='email']").fill("qa@julesai.com");
    await page.locator("input[name='password']").fill("QaJULES2");
    await page.locator("button[type='submit']").click();

    await expect(page).toHaveURL('https://demo.haroldwaste.com/purchases');
  });

  test('Blank Entry Validation', async ({  page }) => {

    await page.locator("input[name='email']").fill("");
    await page.locator("input[name='password']").fill("");
    await page.locator("button[type='submit']").click();

    const emptyValidationText = await page.locator("div.MuiFormControl-root +div").first().textContent();
    expect(emptyValidationText).toContain('Required');
  });

});