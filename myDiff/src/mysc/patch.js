import createEle from "./createElements";
import patchVnode from "./patchVnode";
import vnode from "./vnode";

export default function (oldVnode, newVnode) {
  // 判断老节点是否是虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 新旧节点一样
    patchVnode(oldVnode, newVnode);
  } else {//老节点新节点不是同一个节点
    const newNode = createEle(newVnode);
    oldVnode.elm.parentNode.insertBefore(newNode, oldVnode.elm);
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}