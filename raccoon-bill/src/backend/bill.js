import minimist from 'minimist';
import {generateJson} from './generate-json.js';
import path from 'path';
import {Printer} from './printer.js';
import fs from 'fs/promises';
import {getReport} from '../utils/report-attributes.utils.js';

const port = 8888; // 8000 + (Math.random() * 1000 | 1);

// const params = minimist(process.argv.slice(2));

// console.log('Generate bill from toggl report');
// console.log('node bill -y=2020 -m=01 toggl.csv');
// console.log(params);

// let orphanParams = params['_'];
// if (orphanParams.length === 0) {
//     console.log('Filename must be specified');
//     process.exit();
// }
// const [csvFileName] = orphanParams;


const printer = new Printer(`http://localhost:${port}/`);

const getCsvFileName = async () => {
    const files = await fs.readdir('.');
    const csvs = files.filter(v => v.toString().endsWith('.csv'));
    return csvs.pop();
};

const getNumberOfExistingReports = async (title) => {
    const files = await fs.readdir('.');
    const existing = files.filter(v => v.toString().startsWith(title) && v.toString().endsWith('.pdf'));
    return existing.length;
};

(async () => {
    const csvFileName = await getCsvFileName();
    const reportData = await generateJson(csvFileName);
    const {documentTitle} = getReport(reportData);
    const pdf = await printer.print();
    const existingReports = await getNumberOfExistingReports(documentTitle);
    const fileIndex = existingReports ? ` (${existingReports})` : '';
    const pdfFileName = `${documentTitle}${fileIndex}.pdf`;
    return fs.writeFile(path.resolve(pdfFileName), pdf);
})();

