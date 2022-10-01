import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
  // console.log(oldVnode,newVnode)
  if (newVnode === oldVnode) return;
  // 新节点有text，旧节点没有
  if (newVnode.text !== '' && (newVnode.children === undefined || newVnode.children.length === 0)) {
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    if (oldVnode.children !== undefined && oldVnode.children.length > 0 ) {
      // 旧节点有children
      // console.log(newVnode.children, oldVnode.children)
      updateChildren(oldVnode.elm, newVnode.children, oldVnode.children);
    } else {
      oldVnode.elm.innerText = undefined;
      newVnode.forEach(element => {
        oldVnode.elm.appendChild(createEle(element));
      });
    }
  }
}