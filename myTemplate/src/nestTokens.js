// 处理多级嵌套tokens，将#和/之间的tokens能够整合起来，作为它的下标为3的项

export default function nestTokens(tokens) {
  // 结果数组
  let nestTokens = [];
  // 栈结构，存放小tokens，栈顶（靠近端口的，最新进入的）的tokens数组中当前操作的这个tokens小数组
  let stack = [];
  // 收集器，天生指向nestedTokens结果数组，引用类型值，所以指向的是同一个数组
  // 收集器的指向会变化，当遇见#的时候，收集器会指向这个token的下标为2的新数组
  let temp = nestTokens;
  tokens.forEach(element => {
    // 收集器中放入这个token
    if (element[0] === '#') {
      temp.push(element)
       // 入栈
      stack.push(element);
      // 收集器要换人。给token添加下标为2的项，并且让收集器指向它
      temp = element[2] = [];
    } else if (element[0] === '/') {
      // 出栈。pop()会返回刚刚弹出的项
      stack.pop();
      // 改变收集器为栈结构队尾（队尾是栈顶）那项的下标为2的数组
      temp = stack.length > 0 ? stack[stack.length - 1][2] : nestTokens
    } else {
    // 甭管当前的collector是谁，可能是结果nestedTokens，也可能是某个token的下标为2的数组，甭管是谁，推入collctor即可。
      temp.push(element);
    }
  });
  return nestTokens;
}