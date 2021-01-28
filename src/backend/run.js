import {DocumentCreator} from './create-document.js';

const actCreator = new DocumentCreator({path: '/act', typeName: 'Акт'});
const billCreator = new DocumentCreator({path: '/bill', typeName: 'Счет'});

(async () => {
    await actCreator.create();
    await billCreator.create();
})();
