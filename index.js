import puppeteer from "puppeteer";

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });
  const page = await browser.newPage();
  await page.goto("https://www.example.com");
  await browser.close();
}
// openWebPage();

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/finance/quote/USD-PEN');
  await page.screenshot({path: 'example.png'});
  await browser.close();
}

captureScreenshot();

async function navigateWebPage() {
  const browser = await puppeteer.launch({
    slowMo: 200,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com");
  await page.click('a[href="/login"]');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await browser.close();
}
// navigateWebPage();

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    slowMo: 200,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://tkambio.com/");
  const data = await page.evaluate(() => {
    let title = document.querySelector(".purcharse-content").innerText;
    let description = document.querySelector(".sale-content").innerText;
    return {
      title,
      description,
    };
  });
  console.log(data);
  await browser.close();
}

getDataFromWebPage();

async function handleDynamicWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });
  const page = await browser.newPage();
  await page.goto("https://tkambio.com/");
//   await page.goto("https://quotes.toscrape.com");
  //   await page.waitForSelector('div[data-loaded="true"]'); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  const data = await page.evaluate(() => {
    const purcharse = document.querySelector(".purcharse-content").querySelector("div").innerText;
    const sale = document.querySelector(".sale-content").querySelector("div").innerText;
    // const data = [...quotes].map((quote) => {
    //     const quoteText = quote.querySelector(".text").innerText;
    //     const author = quote.querySelector(".author").innerText;
    //     const tags = [...quote.querySelectorAll(".tag")].map(
    //         (tag) => tag.innerText
    //     );
    //     return {
    //         quoteText,
    //         author,
    //         tags,
    //     };
    // });
    return {
        purcharse: Number(purcharse),
        sale: Number(sale),
    };
  });
  console.log(data);
  await browser.close();
}

handleDynamicWebPage();