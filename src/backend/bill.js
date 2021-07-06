import minimist from 'minimist';
import {generateJson} from './generate-json.js';
import path from 'path';
import {Printer} from './printer.js';
import fs from 'fs';
import {getReport} from '../utils/report-attributes.utils.js';

const printerPort = 8888; // 8000 + (Math.random() * 1000 | 1);
const fsp = fs.promises;

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


const printer = new Printer(`http://localhost:${printerPort}/`);

const getCsvPath = async () => {
    const inboundPath = '../../in';
    const files = await fsp.readdir(inboundPath);
    const csvs = files.filter(v => v.toString().endsWith('.csv'));
    return path.resolve(inboundPath, csvs.pop());
};

const getNumberOfExistingReports = async (title) => {
    const files = await fsp.readdir('.');
    const existing = files.filter(v => v.toString().startsWith(title) && v.toString().endsWith('.pdf'));
    return existing.length;
};

(async () => {
    const csvFileName = await getCsvPath();
    const reportData = await generateJson(csvFileName);
    const {documentTitle} = getReport(reportData);
    const pdf = await printer.print();
    const existingReports = await getNumberOfExistingReports(documentTitle);
    const fileIndex = existingReports ? ` (${existingReports})` : '';
    const pdfFileName = `${documentTitle}${fileIndex}.pdf`;
    return fsp.writeFile(path.resolve('../../out', pdfFileName), pdf);
})();

