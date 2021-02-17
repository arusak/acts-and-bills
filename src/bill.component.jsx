import {formatDate, formatMoney, formatMoneyTotalInWords, formatBillNumber} from './utils/format.utils.js';
import React from 'react';

export const BillComponent = props => {
    const {reportDate, rangeStart, rangeEnd, total, placeholders, documentTitle, price} = props;
    window.document.title = documentTitle;
    const amount = total * price;
    const {doer} = placeholders;

    return <>
        <table className="border-collapse w-full mt-16 mb-4">
            <tbody>
            <tr>
                <td colSpan={2} className="x-cell w-6/12 x-no-bb">
                    {doer.bank.name}
                </td>
                <td className="x-cell w-1/12">БИК</td>
                <td className="x-cell w-5/12">
                    {doer.bank.bik}
                </td>
            </tr>
            <tr>
                <td colSpan={2} className="x-cell x-no-bt">
                    <br/>
                    Банк получателя
                </td>
                <td className="x-cell">Сч. №</td>
                <td className="x-cell">{doer.bank.ks}</td>
            </tr>
            <tr>
                <td className="x-cell">
                    ИНН {placeholders.doerInn}
                </td>
                <td className="x-cell w-2/12"/>
                <td rowSpan={2} className="x-cell">Сч. №</td>
                <td rowSpan={2} className="x-cell">{placeholders.doer.account}</td>
            </tr>
            <tr>
                <td colSpan={2} className="x-cell">
                    <span className="uppercase">{placeholders.doerName}</span>
                    <br/>
                    <br/>
                    Получатель
                </td>
            </tr>
            </tbody>
        </table>

        <h1 className="text-2xl font-bold mt-6 border-black border-b">
            Счет на оплату № {formatBillNumber(reportDate)} от {formatDate(reportDate)}
        </h1>

        <table className="mt-4">
            <tbody>
            <tr>
                <td className="pb-2 align-top">Исполнитель:</td>
                <td className="font-bold pb-2 align-top">ИП {placeholders.doerName},
                    ИНН {placeholders.doerInn}, {placeholders.doer.fullAddress}
                </td>
            </tr>
            <tr>
                <td className="pb-2 align-top">Заказчик:</td>
                <td className="font-bold pb-2 align-top">{placeholders.customer}, ИНН {placeholders.customerInn},
                    КПП {placeholders.customerKpp}</td>
            </tr>
            <tr>
                <td className="pb-2 align-top">Основание:</td>
                <td className="font-bold pb-2 align-top">Договор
                    № {placeholders.contractNo} от {formatDate(placeholders.contractDate)}</td>
            </tr>
            </tbody>
        </table>

        <table className="mt-4 w-full">
            <thead>
            <tr>
                <th className="x-cell">№</th>
                <th className="x-cell">Работы</th>
                <th className="x-cell">Кол-во</th>
                <th className="x-cell">Ед.</th>
                <th className="x-cell">НДС</th>
                <th className="x-cell">Цена</th>
                <th className="x-cell">Сумма</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="x-cell text-center">1</td>
                <td className="x-cell">Разработка программного обеспечения за период:<br/>
                    {formatDate(rangeStart)} - {formatDate(rangeEnd)} НДС не облагается
                </td>
                <td className="x-cell text-center">{formatMoney(total)}</td>
                <td className="x-cell text-center">ч</td>
                <td className="x-cell text-center">без НДС</td>
                <td className="x-cell text-center">{formatMoney(price)}</td>
                <td className="x-cell text-center">{formatMoney(amount)}</td>
            </tr>
            </tbody>
        </table>

        <div className="flex justify-between mt-2">
            <div>Всего наименований на сумму {formatMoney(amount)} руб.</div>
            <div>Итого к оплате: {formatMoney(amount)} руб.</div>
        </div>

        <div className="font-bold mt-4">
            {formatMoneyTotalInWords(amount)}
        </div>

        <hr className="border-black mt-4"/>

        <div className="flex justify-between mt-8">
            <div>Индивидуальный предприниматель</div>
            <div>{placeholders.doerShortName}</div>
        </div>
    </>;
};
