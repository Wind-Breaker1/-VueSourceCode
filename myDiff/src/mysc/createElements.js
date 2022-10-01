// 
export default function createEle(vnode) {
  let Node = document.createElement(vnode.sel);
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    Node.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 递归建立子节点
    vnode.children.forEach(element => {
      const childNode = createEle(element);
      Node.appendChild(childNode);
    });
  }
  vnode.elm = Node;
  return vnode.elm;
}