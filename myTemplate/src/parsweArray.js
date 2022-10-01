import lookUp from "./Lookup";
import renderTemplate from "./renderTemplate";



export default function parseArray(token, data) {
  // 得到整体数据data中这个数组要使用的部分
  const v = lookUp(data, token[1]);
  // 结果字符串
  let resultStr = '';
  // 遍历v数组，v一定是数组
    // 注意，下面这个循环可能是整个包中最难思考的一个循环
    // 它是遍历数据，而不是遍历tokens。数组中的数据有几条，就要遍历几条。
  for (let i = 0; i < v.length; i++) {
    // 这里要补一个“.”属性
    // 拼接
    resultStr += renderTemplate(token[2], {
      ...v[i],
      '.': v[i]
    });
    console.log("par",resultStr);
  }
  
  return resultStr;
}