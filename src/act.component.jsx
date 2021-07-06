import {formatDate, formatHours, formatMoney, formatMoneyTotalInWords} from './utils/format.utils.js';
import React from 'react';

export const ActComponent = props => {
    const {reportDate, rangeStart, rangeEnd, total, tasks, placeholders, price, documentTitle} = props;
    const {contract, customer, doer} = placeholders;
    window.document.title = documentTitle;

    return <>
        <header>
            <h1>АКТ</h1>
            <h2>оказанных услуг и выполненных работ</h2>
            <div className="place-time">
                <div className="place">{contract.place}</div>
                <div className="time">{formatDate(reportDate)}</div>
            </div>
        </header>
        <main>
            <p>
                <strong>{customer.fullName}</strong>, именуемое в&nbsp;дальнейшем&nbsp;—
                «Заказчик», {customer.representative.fullString} с&nbsp;одной стороны, и
            </p>
            <p><strong>Индивидуальный предприниматель {doer.fullName}</strong>, именуемый
                в&nbsp;дальнейшем&nbsp;— «Исполнитель», с&nbsp;другой стороны, совместно именуемые
                в&nbsp;дальнейшем&nbsp;— «Стороны»,
                а&nbsp;по&nbsp;отдельности&nbsp;— «Сторона», составили настоящий Акт оказанных
                услуг и&nbsp;выполненных работ, именуемый в&nbsp;дальнейшем&nbsp;— «Акт»,
                к&nbsp;Договору &#8470;&nbsp;{contract.id} от {formatDate(contract.date)},
                именуемому в&nbsp;дальнейшем&nbsp;— «Договор», о&nbsp;нижеследующем:</p>
            <p>1. Во&nbsp;исполнение п.п.&nbsp;1.1., 1.2. Договора, Исполнитель
                в&nbsp;период <strong>с&nbsp;<span className="no-wrap">{formatDate(rangeStart)}</span>{' '}
                    по&nbsp;<span className="no-wrap">{formatDate(rangeEnd)}</span></strong> оказал
                Заказчику следующие услуги и&nbsp;выполнил работы:</p>

            <section className="table">
                <table>
                    <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Описание<br/>услуг и работ</th>
                        <th>Стоимость<br/>1 чел./часа, в руб.,<br/>НДС не облагается</th>
                        <th>Количество<br/>затраченного времени,<br/>в чел./часах</th>
                        <th>Итоговая стоимость<br/>услуг и работ, руб.,<br/>НДС не облагается</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(({taskId, hours}, idx, arr) => (<tr key={idx}>
                                <td className="index">{idx + 1}</td>
                                <td className="id">{taskId}</td>
                                {idx === 0 &&
                                <td className="price" rowSpan={arr.length}>{formatMoney(price)}</td>
                                }
                                <td className="hours">{formatHours(hours)}</td>
                                <td className="amount">{formatMoney(hours * price)}</td>
                            </tr>
                        ))
                    }
                    <tr className="total">
                        <td className="label" colSpan="3">Итого:</td>
                        <td className="hours">{formatHours(total)}</td>
                        <td className="amount">{formatMoney(total * price)}</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            <p>2. Услуги оказаны, а&nbsp;работы выполнены согласно Договору своевременно в&nbsp;необходимом объеме
                и&nbsp;в&nbsp;соответствии с&nbsp;требованиями, установленными Договором к&nbsp;их&nbsp;качеству.
                Заказчик претензий по&nbsp;объему, срокам и&nbsp;качеству оказанных услуг и&nbsp;выполненных работ
                не&nbsp;имеет.</p>
            <p>3. Общая стоимость оказанных услуг и&nbsp;выполненных работ по&nbsp;Заявке
                составляет {formatMoney(total * price).replace(/\s/, '')}&nbsp;руб.
                ({formatMoneyTotalInWords(total * price)}), НДС не&nbsp;облагается в&nbsp;связи
                с&nbsp;применением Исполнителем упрощенной системы налогообложения и&nbsp;подлежит оплате Заказчиком
                в&nbsp;соответствии с&nbsp;условиями Договора.</p>
            <p>4. Настоящий Акт составлен в&nbsp;2 (двух) экземплярах, по&nbsp;одному экземпляру для Исполнителя
                и&nbsp;Заказчика.</p>
        </main>
        <footer className="footer">
            <table>
                <tbody>
                <tr>
                    <td>Заказчик:</td>
                    <td>Исполнитель:</td>
                </tr>
                <tr className="names">
                    <td>{customer.shortName}</td>
                    <td>Индивидуальный предприниматель<br/>
                        {doer.fullName}
                    </td>
                </tr>
                <tr>
                    <td className="signature">
                        <span className="placeholder"/>
                        <span className="value"> / {customer.representative.shortName} /</span>
                    </td>
                    <td className="signature">
                        <span className="placeholder"/>
                        <span className="value"> / {doer.shortName} /</span>
                    </td>
                </tr>
                <tr>
                    <td>М. П.</td>
                    <td/>
                </tr>
                </tbody>
            </table>
        </footer>
    </>;
};
