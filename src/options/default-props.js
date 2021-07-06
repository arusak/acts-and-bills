// use this file as template to create custom-props.js
export default {
    doer: {
        fullName: 'Иванов Иван Иванович',
        shortName: 'И. И. Иванов',
        title: 'ИП Иванов',
        inn: '770000000001',
        account: '40000000000000000000',
        bank: {
            name: 'АО "БАНК"',
            bik: '040000000',
            ks: '30100000000000000000'
        },
        fullAddress: '123456, Россия, г. Москва, ул. Академика Королёва, 12'
    },
    customerRepresentative: '',
    customerShortName: '',
    customer: {
        fullName: 'Общество с ограниченной ответственностью «Вектор»',
        shortName: 'ООО «Вектор»',
        title: 'Вектор',
        inn: '7700000000',
        kpp: '770101001',
        representative: {
            shortName: 'П. П. Петров',
            fullString: 'в лице Петрова Петра Петровича, действующего на основании Устава,',
        },
    },
    contract: {
        id: '123',
        date: '2020-01-01',
        place: 'г. Москва'
    },
    priceHistory: [
        ['2020-01-01', 100],
        ['2020-04-01', 200],
        ['2020-07-01', 300],
        ['2021-10-01', 400],
    ]
};
