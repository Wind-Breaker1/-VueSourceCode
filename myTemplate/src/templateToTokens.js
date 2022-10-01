import Scanner from './Scanner'
import NestTokens from './nestTokens'

// 模板字符串转为tokens数组

export default function TemplateToTokens(templateStr) {
  // 创建扫描器
  let scanner = new Scanner(templateStr);
  let tokens = [];
  let word;
  // 让扫描器工作
  while (scanner.pos < templateStr.length) {
    // 收集开始标记出现之前的文字
    word = scanner.scanUtil('{{');
    //智能判断是普通文字的空格，还是标签中的空格，标签中的空格不能去掉，
    //比如 < div class="box" > 不能去掉class前面的空格
    if (word !== '') {
      // 标志空格是否在标签内
      let isInHtml = false;
      // 保存去掉空格的字符串
      let words = '';
      // 循环扫描字符串并做判断
      for (const element of word) {
        // 判断是否在标签里
        if (element === '<') {
          isInHtml = true;
        } else if (element === '>') {
          isInHtml = false;
        }
        // 如果是空格
        if (/\s/.test(element)) {
          // 只有在标签内才拼接到结果字符串中
          if (isInHtml) {
            words += " ";
          }
        } else {
          // 不是空格直接拼接
          words += element;
        }
      };
      // 将去空格后的字符串保存到tokens中
      tokens.push(['text', words]);
    }
     // 过双大括号
    scanner.scan('{{');
    // 收集大括号内的内容
    word = scanner.scanUtil('}}');
    if (word !== '') {
      // 判断一下首字符
      if (word[0] === '#')
        // 从下标为1的项开始存，因为下标为0的项是#
        tokens.push(['#', word.substring(1)]);
      else if (word[0] === '/')
        // 从下标为1的项开始存，因为下标为0的项是/
        tokens.push(['/', word.substring(1)]);
      else
        // 存起来
        tokens.push(['name', word]);
    }
    // 过双大括号
    scanner.scan('}}');
  }
  // 返回折叠收集的tokens
  return NestTokens(tokens);
}