import axios from 'axios'
import * as puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

export async function getPhoneSpecs(phoneName) {
  try {
    const searchUrl = `https://www.gsmarena.com/res.php3?sSearch=${phoneName}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(searchUrl);

    const firstResultLink = await page.evaluate((phoneName) => {
      const regex = new RegExp(`${phoneName.toLowerCase().replace(/ /g, '_')}-\\d+\\.php`);
      const links = Array.from(document.querySelectorAll('#decrypted a'));
      for (let link of links) {
        const href = link.getAttribute('href');
        if (href && regex.test(href)) {
          return href;
        }
      }
      return null;
    }, phoneName);

    await browser.close();

    if (!firstResultLink) {
      throw new Error('Phone not found');
    }

    const phoneUrl = `https://www.gsmarena.com/${firstResultLink}`;
    const phoneResponse = await axios.get(phoneUrl);
    const $ = cheerio.load(phoneResponse.data);

    const specs = {
      processor: $('div[data-spec="chipset-hl"]').text().trim() || 'N/A',
      memory: $('span[data-spec="ramsize-hl"]').text().trim() + ' GB' || 'N/A',
      displaySize: $('div[data-spec="displayres-hl"]').text().trim() || 'N/A',
      battery: $('span[data-spec="batsize-hl"]').text().trim() + ' mAh' || 'N/A',
      os: $('span[data-spec="os-hl"]').text().trim() || 'N/A',
      mainCamera: $('span[data-spec="camerapixels-hl"]').text().trim() + ' MP' || 'N/A'
    };

    return specs;
  } catch (error) {
    console.error('Error fetching phone data:', error);
    throw error;
  }
}
