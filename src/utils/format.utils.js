import rubles from './rubles';

export const formatHours = a => a.toLocaleString('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
});

export const formatMoney = a => a.toLocaleString('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export const formatMoneyTotalInWords = a => rubles(a).substring(0, 1).toUpperCase() + rubles(a).substring(1);

export const formatDate = d => new Date(d).toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

export const formatBillNumber = d => new Date(d).toISOString().substr(0, 10).split('-').join('') + '01';
