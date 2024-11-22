// 导入vue-i18n
import { createI18n } from 'vue-i18n';
// 导入store
import Store from '@/store';
// 导入element-plus的英文语言包
import elementEnLocale from 'element-plus/es/locale/lang/en';
// 导入element-plus的中文语言包
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn';
// 导入element-plus的日文语言包
import elementJaLocale from 'element-plus/es/locale/lang/ja';
// 导入本地的英文语言包
import enLocale from './en';
// 导入本地的中文语言包
import zhLocale from './zh';
// 导入本地的日文语言包
import jaLocale from './ja';
// 导入avue的英文语言包
import AvueEnLocale from '@smallwei/avue/lib/locale/lang/en';
// 导入avue的中文语言包
import AvueZhLocale from '@smallwei/avue/lib/locale/lang/zh';

// 导出一个名为messages的对象，包含三种语言环境：en、'zh-cn'和ja
export const messages = {
  // 英文环境
  en: {
    // 将enLocale对象中的属性合并到en中
    ...enLocale,
    // 将AvueEnLocale对象中的属性合并到en中
    ...AvueEnLocale,
    // 将elementEnLocale对象中的属性合并到en中
    ...elementEnLocale,
  },
  // 中文环境
  'zh-cn': {
    // 将zhLocale对象中的属性合并到'zh-cn'中
    ...zhLocale,
    // 将AvueZhLocale对象中的属性合并到'zh-cn'中
    ...AvueZhLocale,
    // 将elementZhLocale对象中的属性合并到'zh-cn'中
    ...elementZhLocale,
  },
  // 日文环境
  ja: {
    // 将jaLocale对象中的属性合并到ja中
    ...jaLocale,
    // 将elementJaLocale对象中的属性合并到ja中
    ...elementJaLocale,
  },
};
// 导出Store中的language属性
export const { language } = Store.getters;
// 导出createI18n函数，并传入locale和messages参数
export default createI18n({
  locale: language,
  messages,
});
