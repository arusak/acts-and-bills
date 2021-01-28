import dateFns from 'date-fns';

import defaultReportProps from '../options/default-props.js';
import customReportProps from '../options/custom-props.js';

const placeholders = {
    ...defaultReportProps,
    ...customReportProps
};

export function getReport(reportData, type) {
    let defaults = {
        rangeStart: new Date(),
        rangeEnd: new Date(),
        tasks: [],
        total: 0
    };

    reportData = {...defaults, ...reportData};

    const rangeStart = new Date(reportData.rangeStart);
    const rangeEnd = new Date(reportData.rangeEnd);
    const reportDate = dateFns.startOfMonth(dateFns.addMonths(rangeStart, 1));

    const documentTitle = `${placeholders.customerTitle}_${placeholders.doerTitle}_${type}_${rangeStart.getFullYear()}_${(rangeStart.getMonth() + 1).toLocaleString('ru-RU', {minimumIntegerDigits: 2})}`;

    return {
        ...reportData, rangeStart, rangeEnd, reportDate, documentTitle, placeholders
    };
}
