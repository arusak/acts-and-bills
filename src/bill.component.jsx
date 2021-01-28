import {formatDate, formatMoney, formatMoneyTotalInWords, formatBillNumber} from './utils/format.utils.js';
import React from 'react';

export const BillComponent = props => {
    const {reportDate, rangeStart, rangeEnd, total, placeholders, documentTitle, price} = props;
    window.document.title = documentTitle;
    const amount = total * price;
    const {doer} = placeholders;

    return <>
        <table className="border-collapse w-full table-cell-border">
            <tr>
                <td colSpan={2} className="table-cell-border w-6/12">
                    {doer.bank.name}
                </td>
                <td className="table-cell-border w-1/12">БИК</td>
                <td rowSpan={2} className="table-cell-border w-5/12">
                    {doer.bank.bik}<br/>{doer.bank.ks}
                </td>
            </tr>
            <tr>
                <td colSpan={2} className="table-cell-border">
                    Банк получателя
                </td>
                <td className="table-cell-border">Сч. №</td>
            </tr>
            <tr>
                <td className="table-cell-border">
                    ИНН {placeholders.doerInn}
                </td>
                <td className="table-cell-border"/>
                <td rowSpan={2} className="table-cell-border">Сч. №</td>
                <td rowSpan={2} className="table-cell-border">{placeholders.doer.account}</td>
            </tr>
            <tr>
                <td colSpan={2} className="table-cell-border">
                    <span className="uppercase">{placeholders.doerName}</span><br/><br/>Получатель
                </td>
            </tr>
        </table>

        <h1 className="text-2xl font-bold">
            Счет на оплату № {formatBillNumber(reportDate)} от {formatDate(reportDate)}.
        </h1>

        <table>
            <tr>
                <td>Исполнитель:</td>
                <td>{placeholders.doerName}, ИНН {placeholders.doerInn},
                </td>
            </tr>
            <tr>
                <td>Заказчик:</td>
                <td>{placeholders.customer}, ИНН {placeholders.customerInn},
                    КПП {placeholders.customerKpp}</td>
            </tr>
            <tr>
                <td>Основание:</td>
                <td>Договор № {placeholders.contractNo} от {placeholders.contractDate} г.</td>
            </tr>
        </table>

        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Работы</th>
                <th>Кол-во</th>
                <th>Ед.</th>
                <th>НДС</th>
                <th>Цена</th>
                <th>Сумма</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>{total}</td>
                <td>Разработка программного обеспечения за период:{' '}
                    {formatDate(rangeStart)}-{formatDate(rangeEnd)}. НДС не облагается
                </td>
                <td>ч</td>
                <td>без НДС</td>
                <td>{price}</td>
                <td>{amount}</td>
            </tr>
            </tbody>
        </table>

        <div>
            <div>Всего наименований на сумму {formatMoney(amount)} руб.</div>
            <div>Итого к оплате: {formatMoney(amount)} руб.</div>
        </div>

        <div>
            {formatMoneyTotalInWords(amount)}
        </div>

        <hr/>

        <div className="flex">
            <div>Индивидуальный предприниматель</div>
            <div>{placeholders.doerShortName}</div>
        </div>
    </>;
};
