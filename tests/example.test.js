// tests/example.test.js

const { chromium } = require('playwright');

(async () => {
  // Запускаем браузер Chrome
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Открываем страницу
  await page.goto('https://example.com');

  // Выполняем действия на странице
  console.log(await page.title());

  // Закрываем браузер
  await browser.close();
})();
