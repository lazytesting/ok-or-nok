const puppeteer = require('puppeteer');
const path = require('path');
const mkdirp = require('mkdirp-promise')

async function take(filePath, fileName, endpoint) {

    await mkdirp(filePath);

    const fullPath = path.join(filePath, fileName)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(endpoint);
    await page.screenshot({path: fullPath});
  
    await browser.close();
}



module.exports = { take }