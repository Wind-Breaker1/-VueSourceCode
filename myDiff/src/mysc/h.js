import vnode from './vnode.js'

export default function (sel, data, temp) {
  if (arguments.length !== 3) {
    throw new Error('对不起，h函数必须传入3个参数，我们是低配版h函数');
  }
  if (typeof temp === 'string' || typeof temp === 'number') {
    return vnode(sel, data, undefined, temp, undefined);
  } else if (Array.isArray(temp)) {
    let children = [];
    temp.forEach(item => {
      if (typeof item !== 'object' || !item.hasOwnProperty('sel')) {
        throw new Error('传入的数组参数中有项不是h函数')
      }
      children.push(item);
    })
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof item !== 'object') {
    return vnode(sel, data, [temp], undefined, undefined);
  } else {
    throw new Error('传入的第三个参数类型不对');
  }
}