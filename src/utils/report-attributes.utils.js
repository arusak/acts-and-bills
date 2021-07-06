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

    const price = getPriceForDate(placeholders.priceHistory, rangeStart);
    const ticketIdRegex = placeholders.ticketIdRegex;

    const documentTitle = `${placeholders.customer.title}_${placeholders.doer.title}_${type}_${rangeStart.getFullYear()}_${(rangeStart.getMonth() + 1).toLocaleString('ru-RU', {minimumIntegerDigits: 2})}`;

    return {
        ...reportData, rangeStart, rangeEnd, reportDate, documentTitle, placeholders, price, ticketIdRegex
    };
}

export function getTicketIdRegex() {
    return placeholders.contract.id;
}

const getPriceForDate = (priceHistory, reportDate) => {
    try {
        // reverse array of prices with dates
        const pricesByDates = priceHistory.map(([dateStr, value]) => ([new Date(dateStr), value])).sort(([dateA], [dateB]) => dateA.getTime() >= dateB.getTime() ? -1 : 1);
        // in reverse chronology, find first date that is smaller than out report's
        const [, price] = pricesByDates.find(([date]) => reportDate.getTime() >= date.getTime());
        return price;
    } catch (e) {
        console.error('Price history is in wrong format or report period start is out of price history');
        console.log(`Report start: ${reportDate}`);
        console.log(`Price history:`);
        console.table(priceHistory);
    }
};
