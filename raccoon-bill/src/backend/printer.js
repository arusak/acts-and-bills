import puppeteer from 'puppeteer';

const options = {
    displayHeaderFooter: false,
    format: 'a4',
    margin: {top: '30px', left: '38px', bottom: '40px'},
};

export class Printer {
    constructor(url) {
        this.url = url;
    }

    async print() {
        this.browser = await puppeteer.launch();
        const pdf = await this.getPdfFromHostedApp();
        await this.browser.close();
        return pdf;
    };

    async getPdfFromHostedApp() {
        const page = await this.browser.newPage();
        await page.goto(this.url, {waitUntil: 'networkidle2'});
        return await page.pdf(options);
    }
}


