import lookUp from "./Lookup";
import parseArray from "./parsweArray";

// 函数的功能是让tokens数组变为dom字符串

export default function renderTemplate(tokens, data) {
  // 结果字符串
  let resultStr = '';
  // 遍历tokens
  tokens.forEach(element => {
    // 看类型
    if (element[0] === 'text') {
      // 拼起来
      resultStr += element[1];
    } else if (element[0] === 'name') {
      // 如果是name类型，那么就直接使用它的值，当然要用lookup因为防止这里是“a.b.c”有逗号的形式
      resultStr += lookUp(data, element[1]);
    } else if (element[0] === '#') {
      resultStr += parseArray(element, data);
    }
    console.log("ren", resultStr)
  });
  return resultStr;
}