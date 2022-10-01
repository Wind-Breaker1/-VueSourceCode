import patchVnode from "./patchVnode";
import createEle from "./createElements";

// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.data.key === b.data.key;
};

export default function (parentNode, newCh, oldCh) {
  let oldStartIndex = 0;
  let newStartIndex = 0;
  let oldEndIndex = oldCh.length - 1;
  let newEndIndex = newCh.length - 1;
  let oldStartVnode = oldCh[oldStartIndex];
  let oldEndVnode = oldCh[oldEndIndex];
  let newStartVnode = newCh[newStartIndex];
  let newEndVnode = newCh[newEndIndex];
  let keyMap = null;
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartVnode === undefined) {
      oldStartVnode = oldCh[++oldStartIndex];
    } else if (oldEndVnode === undefined) {
      oldEndVnode = oldCh[--oldEndIndex];
    } else if (newStartVnode === undefined) {
      newStartVnode = newCh[++newStartIndex];
    } else if (newEndVnode === undefined) {
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log('①新前和旧前命中');
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode= newCh[++newStartIndex];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log('②新后和旧后命中');
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log('③新后和旧前命中');
      patchVnode(oldStartVnode, newEndVnode);
      parentNode.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      console.log('④新前和旧后命中');
      patchVnode(oldEndVnode, newStartVnode);
      parentNode.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartIndex];
    } else {
      // console.log(oldStartVnode, newStartVnode)
      console.log(oldEndVnode, newEndVnode)
      if (!keyMap) {
        keyMap = {};
        // 从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射对象
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          const key = oldCh[i].data.key;
          if (key != undefined) {
            keyMap[key] = i;
          }
        }
      }
      // console.log(keyMap)
      const index = keyMap[newStartVnode.key];
      // console.log('index', index)
      if (index === undefined) {
        parentNode.insertBefore(createEle(newStartVnode), oldStartVnode.elm)
      } else {
        const eleToMove = old[index];
        patchVnode(eleToMove, newStartVnode);
        // 把这项设置为undefined，表示我已经处理完这项了
        oldCh[index] = undefined;
        // 移动，调用insertBefore也可以实现移动。
        parentNode.insertBefore(eleToMove.elm, oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIndex]
    }
    
  }
  // 继续看看有没有剩余的。循环结束了start还是比old小
  if (newStartIndex <= newEndIndex) {
    console.log('new还有剩余节点没有处理，要加项。要把所有剩余的节点，都要插入到oldStartIdx之前');
    // 遍历新的newCh，添加到老的没有处理的之前
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾去。和appendChild是一致了。
      // newCh[i]现在还没有真正的DOM，所以要调用createElement()函数变为DOM
      // console.log(newStartIndex, newEndIndex)
      parentNode.insertBefore(createEle(newCh[i]), oldCh[oldStartIndex].elm);
    }
  } else if (oldStartIndex <= oldEndIndex) {
    console.log('old还有剩余节点没有处理，要删除项');
    // 批量删除oldStart和oldEnd指针之间的项
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldCh[i]) {
        parentNode.removeChild(oldCh[i].elm);
      }
    }
  }

}