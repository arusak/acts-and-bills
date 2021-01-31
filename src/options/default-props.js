// use this file as template to create custom-props.js
export default {
    price: 100,
    doerName: 'Иванов Иван Иванович',
    doerShortName: 'И. И. Иванов',
    doerTitle: 'ИП Иванов',
    doerInn: '770000000001',
    doer: {
        account: '40000000000000000000',
        bank: {
            name: 'АО "БАНК"',
            bik: '040000000',
            ks: '30100000000000000000'
        },
        fullAddress: '123456, Россия, г. Москва, ул. Академика Королёва, 12'
    },
    customer: 'ООО «Вектор»',
    customerRepresentative: 'в лице Петрова Петра Петровича, действующего на основании Устава,',
    customerShortName: 'П. П. Петров',
    customerTitle: 'Вектор',
    customerInn: '7700000000',
    customerKpp: '770101001',
    contractNo: '123',
    contractDate: '2020-01-01',
    priceHistory: [
        ['2020-01-01', 100],
        ['2020-04-01', 200],
        ['2020-07-01', 300],
        ['2021-10-01', 400],
    ]
};
