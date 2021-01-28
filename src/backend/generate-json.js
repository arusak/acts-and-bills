import fs from 'fs';
import path from 'path';
import {getReport} from '../utils/report-attributes.utils.js';

const fsp = fs.promises;

export const generateJson = async (csvPath) => {
    const [rangeStart, rangeEnd] = getRange(csvPath);

    const buf = await fsp.readFile(csvPath);
    const csv = buf.toString();
    const [, ...csvRows] = csv.split('\n');
    const records = csvRows
        .filter(row => row.includes(','))
        .map(row => row.split(','))
        .map(([, task, time]) => {
            let [hours, minutes] = time.split(':');
            hours = Number(hours) + Number(minutes) / 60;
            const [, taskId] = task.match(/((DXREQ|AMP)-[0-9]+)/) || ['', task];
            return ({
                taskId,
                hours
            });
        });

    let tasks = records.reduce((res, cur) => {
        let task = res.find(t => t.taskId === cur.taskId);
        if (!task) {
            task = {taskId: cur.taskId, hours: 0};
            res.push(task);
        }
        task.hours += cur.hours;
        return res;
    }, []);//.sort((j1, j2) => j1.taskId.localeCompare(j2.taskId));

    let total = tasks.reduce((sum, task) => sum += task.hours, 0);

    const result = {tasks, total, rangeStart, rangeEnd};
    const report = getReport(result);

    const stringified = JSON.stringify(report, null, 2);
    return fsp.writeFile(path.resolve('../..', 'public', 'report.js'), `var reportData = ${stringified};`).then(() => report);
};

const getRange = filename => {
    const re = /([0-9]{4}-[0-9]{2}-[0-9]{2})/g;
    return (filename.match(re));
};
