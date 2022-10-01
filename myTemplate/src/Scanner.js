// 扫描器类
export default class Scanner {
  constructor(templateStr) {
    // 将模板字符串写到实例身上
    this.templateStr = templateStr;
    // 指针指向尾巴开头的下标
    this.pos = 0;
    // 尾巴，一开始就是模板字符串原文
    this.tail = templateStr;
  }
  // 使指针跳过指定标记
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      // tag有多长，比如{{长度是2，就让指针后移多少位
      this.pos += tag.length;
      // 改变尾巴为从当前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substring(this.pos);
    }
  }
  // 一个一个遍历寻找指定标记，并把扫描的字符作为字符串返回
  scanUtil(stopTag) {
    // 记录一下执行本方法的时候pos的值，方便后期截取字符串
    const post_back = this.pos;
    // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
    // 写&&很有必要，因为防止找不到，那么寻找到最后也要停止下来
    while (this.tail.indexOf(stopTag) !== 0 && this.pos < this.templateStr.length) {
      this.pos++;
      // 改变尾巴为从当前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substring(this.pos);
    }
    //返回截取的目标字符串
    return this.templateStr.substring(post_back, this.pos);
  }
}