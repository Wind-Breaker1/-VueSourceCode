import Observer from './Observer.js';
export default function (obj) {
    // 如果value不是对象，什么都不做
    if (typeof obj != 'object') return;
    else new Observer(obj);
}
