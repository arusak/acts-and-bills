import path from 'path';
import {generateJson} from './generate-json.js';
import {Printer} from './printer.js';
import {promises as fsp} from 'fs';
import {getReport} from '../utils/report-attributes.utils.js';
import {inboundPath, outboundPath} from './options.js';

const printerPort = 3000;

export class DocumentCreator {
    constructor({path = '/', typeName = 'Документ'}) {
        this.typeName = typeName;
        this.printer = new Printer(`http://localhost:${printerPort}${path}`);
    }

    getCsvPath = async () => {
        const files = await fsp.readdir(inboundPath);
        const csvs = files.filter(v => v.toString().endsWith('.csv'));
        return path.resolve(inboundPath, csvs.pop());
    };

    getNumberOfExistingDocuments = async (title) => {
        const files = await fsp.readdir(outboundPath);
        const existing = files.filter(v => v.toString().startsWith(title) && v.toString().endsWith('.pdf'));
        return existing.length;
    };

    getPdfFileName = async (documentTitle) => {
        const existingReports = await this.getNumberOfExistingDocuments(documentTitle);
        const fileIndex = existingReports ? ` (${existingReports})` : '';
        return `${documentTitle}${fileIndex}.pdf`;
    };

    create = async () => {
        const csvFileName = await this.getCsvPath();
        const reportData = await generateJson(csvFileName);
        const {documentTitle} = getReport(reportData, this.typeName);

        const pdf = await this.printer.print();

        const pdfFileName = await this.getPdfFileName(documentTitle);
        console.log(pdfFileName);
        return fsp.writeFile(path.resolve(outboundPath, pdfFileName), pdf);
    };
}
