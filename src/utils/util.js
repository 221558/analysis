import { validatenull } from './validate';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
// 表单序列化
export const serialize = (data) => {
  const list = [];
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join('&');
};
export const getObjType = (obj) => {
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = (data) => {
  const type = getObjType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (const key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = `${document.body.className} grayMode`;
  } else {
    document.body.className = document.body.className.replace(' grayMode', '');
  }
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name;
};

/**
 * 加密处理
 */
export const encryption = (params) => {
  const { data = {}, type, param, key } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type == 'Base64') {
    param.forEach((ele) => {
      result[ele] = Base64.stringify(result[ele]);
    });
  } else if (type == 'Aes') {
    param.forEach((ele) => {
      result[ele] = sha256(result[ele], key);
    });
  }
  return result;
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback();
  }
  document.addEventListener('fullscreenchange', () => {
    listen();
  });
  document.addEventListener('mozfullscreenchange', () => {
    listen();
  });
  document.addEventListener('webkitfullscreenchange', () => {
    listen();
  });
  document.addEventListener('msfullscreenchange', () => {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  const isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
  return isFullscreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else if (menu[i].children[j].children.length != 0) {
          return findParent(menu[i].children[j].children, id);
        }
      }
    }
  }
};
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = (url) => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close;
  const o1 = obj1 instanceof Object;
  const o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (const attr in obj1) {
    const t1 = obj1[attr] instanceof Object;
    const t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
};
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = '';
  if (validatenull(dic)) return value;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    let index = 0;
    index = findArray(dic, value);
    if (index != -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach((ele) => {
      index = findArray(dic, ele);
      if (index != -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
    }
  }
  return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4);
  if (date) random += Date.now();
  return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  const width = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || screen.width;
  const height = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || screen.height;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`,
  );

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
};

export const getScreen = (isCollapse) => {
  if (document.body.clientWidth <= 768) {
    return !isCollapse;
  } else {
    return isCollapse;
  }
};

/**
 * 获取顶部地址栏地址
 */
export const getTopUrl = () => {
  return window.location.href.split('/#/')[0];
};

/**
 * 获取url参数
 * @param name 参数名
 */
export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(decodeURI(r[2]));
  return null;
};

/**
 * 字符串转义
 * @param {*} str
 * @returns
 */
export const escape2Html = (str) => {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, (all, t) => {
    return arrEntities[t];
  });
};

/** Html转义和反转义（html编码和解码 */
export const HtmlUtil = {
  /* 1.用浏览器内部转换器实现html编码（转义） */
  htmlEncode(html) {
    // 1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement('div');
    // 2.然后将要转换的字符串设置为这个元素的innerText或者textContent
    temp.textContent != undefined ? (temp.textContent = html) : (temp.innerText = html);
    // 3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    const output = temp.innerHTML;
    temp = null;
    return output;
  },
  /* 2.用浏览器内部转换器实现html解码（反转义） */
  htmlDecode(text) {
    // 1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement('div');
    // 2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    // 3.最后返回这个元素的innerText或者textContent，即得到经过HTML解码的字符串了。
    const output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  },
  /* 3.用正则表达式实现html编码（转义） */
  htmlEncodeByRegExp(str) {
    let temp = '';
    if (str.length == 0) return '';
    temp = str.replace(/&/g, '&amp;');
    temp = temp.replace(/</g, '&lt;');
    temp = temp.replace(/>/g, '&gt;');
    temp = temp.replace(/\s/g, '&nbsp;');
    // eslint-disable-next-line no-useless-escape
    temp = temp.replace(/\'/g, '&#39;');
    // eslint-disable-next-line no-useless-escape
    temp = temp.replace(/\"/g, '&quot;');
    return temp;
  },
  /* 4.用正则表达式实现html解码（反转义） */
  htmlDecodeByRegExp(str) {
    let temp = '';
    if (str.length == 0) return '';
    temp = str.replace(/&amp;/g, '&');
    temp = temp.replace(/&lt;/g, '<');
    temp = temp.replace(/&gt;/g, '>');
    temp = temp.replace(/&nbsp;/g, ' ');
    temp = temp.replace(/&#39;/g, "'");
    temp = temp.replace(/&quot;/g, '"');
    return temp;
  },
  /* 5.用正则表达式实现html编码（转义）（另一种写法） */
  html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g, (c) => {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
    });
  },
  /* 6.用正则表达式实现html解码（反转义）（另一种写法） */
  escape2Html(str) {
    const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, (all, t) => {
      return arrEntities[t];
    });
  },
};
