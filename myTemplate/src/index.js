import TemplateToTokens from './templateToTokens'
import RenderTemplate from './renderTemplate'
// 全局提供myTemplate类
window.myTemplate = {
  // 渲染方法
  render(templateStr, data) {
    // 调用parseTemplateToTokens函数，让模板字符串能够变为tokens数组
    let tokens = TemplateToTokens(templateStr);
    // 调用renderTemplate函数，让tokens数组变为dom字符串
    let res = RenderTemplate(tokens, data);
    return res;
  }
}