import website from '@/config/website';

const modules = import.meta.glob('../**/**/*.vue');
function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}
const RouterPlugin = function () {
  this.$router = null;
  this.$store = null;
};
RouterPlugin.install = function (option = {}) {
  this.$router = option.router;
  this.$store = option.store;
  const i18n = option.i18n.global;
  this.$router.$avueRouter = {
    safe: this,
    // 设置标题
    setTitle: (title) => {
      const defaultTitle = i18n.t('title');
      title = title ? `${title} | ${defaultTitle}` : defaultTitle;
      document.title = title;
    },
    /**
     * 关闭标签页
     *
     * 此函数用于关闭当前标签页或指定路径的标签页
     * 它首先根据提供的值或当前标签的名称查找对应的标签对象，然后通过 Vuex mutation 删除该标签
     *
     * @param {string} [value] - 可选参数，指定要关闭的标签的路径如果未提供，关闭当前标签
     */
    closeTag: (value) => {
      // 设置要关闭的标签，如果提供了value参数，则使用该值，否则使用当前标签的名称
      let tag = value || this.$store.getters.tag;

      // 如果value是字符串类型，则从标签列表中查找对应路径的标签对象
      if (typeof value === 'string') {
        tag = this.$store.getters.tagList.find((ele) => ele.fullPath === value);
      }

      // 通过Vuex mutation删除找到的标签
      this.$store.commit('DEL_TAG', tag);
    },
    /**
     * 生成标题
     *
     * 此函数用于根据给定的item对象和属性配置生成一个标题如果提供了query属性，则优先使用query对象中的name属性作为标题
     * 如果没有提供query属性，但提供了label属性，则使用item对象中的label属性作为标题如果上述都不适用，且item对象包含meta属性，
     * 并且meta属性中包含i18n键，则尝试使用i18n库来翻译对应的路由标题
     *
     * @param {Object} item - 包含路由信息的对象，通常是一个路由配置
     * @param {Object} props - 额外的属性配置，可以用来覆盖默认的属性名
     * @returns {String} - 生成的标题，可能是直接从item对象中获取的，也可能是通过i18n翻译的
     */
    generateTitle: (item, props = {}) => {
      // 获取query对象，如果没有提供，则使用默认的'query'属性
      const query = item[props.query || 'query'] || {};
      // 优先使用query对象中的name属性作为标题，如果没有提供，则使用默认的'label'属性
      const title = query.name || item[props.label || 'label'];
      // 获取meta对象，如果没有提供，则使用默认的'meta'属性
      const meta = item[props.meta || 'meta'] || {};
      // 检查meta对象中是否包含i18n键
      const key = meta.i18n;
      // 如果存在i18n键，则尝试使用i18n库来翻译对应的路由标题
      if (key) {
        // 检查是否存在对应的翻译键
        const hasKey = i18n.te(`route.${key}`);
        // 如果存在，则返回翻译后的标题
        if (hasKey) return i18n.t(`route.${key}`);
      }
      return title.split(',')[0];
    },
    // 动态生成路由
    formatRoutes(aMenu = [], first) {
      // 初始化路由数组
      const aRouter = [];
      // 默认属性配置
      const propsDefault = website.menu;
      // 若菜单为空，则直接返回
      if (aMenu && aMenu.length === 0) return;

      // 遍历菜单项
      for (let i = 0; i < aMenu.length; i++) {
        const oMenu = aMenu[i];
        const path = oMenu[propsDefault.path];
        const { component } = oMenu;
        const name = `${oMenu[propsDefault.label]},${oMenu.id}`;
        const icon = oMenu[propsDefault.icon];
        const children = oMenu[propsDefault.children];
        const query = oMenu[propsDefault.query];
        const meta = oMenu[propsDefault.meta];
        if (option.keepAlive) {
          meta.keepAlive = option.keepAlive;
        }

        // 判断是否有子路由
        const isChild = !!(children && children.length !== 0);

        // 构建路由对象
        const oRouter = {
          path,
          component: (() => {
            // 首路由处理
            if (first) {
              return modules[option.store.getters.isMacOs ? '../page/index/layout.vue' : '../page/index/index.vue'];
              // 多层路由处理
            } else if (isChild && !first) {
              return modules['../page/index/layout.vue'];
              // 最终页面视图处理
            } else {
              const result = modules[`../${component}.vue`];
              if (result)
                result().then((mod) => {
                  mod.default.name = path;
                  return mod;
                });
              else {
                console.log(`${component}不存在`);
              }
              return result;
            }
          })(),
          name,
          icon,
          meta,
          query,
          redirect: (() => {
            if (!isChild && first) return `${path}`;
            else return '';
          })(),
          // 一级路由处理
          children: !isChild
            ? (() => {
                if (first) {
                  oMenu[propsDefault.path] = `${path}`;
                  const result = modules[`../${component}.vue`];
                  if (result) {
                    result().then((mod) => {
                      mod.default.name = path;
                      return mod;
                    });
                  } else {
                    console.log(`${component}不存在`);
                  }
                  return [
                    {
                      component: result,
                      icon,
                      name,
                      meta,
                      query,
                      path: '',
                    },
                  ];
                }
                return [];
              })()
            : (() => {
                return this.formatRoutes(children, false);
              })(),
        };

        // 非URL路径则添加到路由数组
        if (!isURL(path)) aRouter.push(oRouter);
      }

      // 首路由处理
      if (first) {
        aRouter.forEach((ele) => this.safe.$router.addRoute(ele));
      } else {
        return aRouter;
      }
    },
  };
};
/**
 * 格式化路由路径
 * 此函数用于处理菜单项或路由配置，根据不同的条件设置图标、组件和查询参数
 * 特别处理了外部链接，将其在iframe中打开
 *
 * @param {Object} ele - 当前正在处理的菜单项或路由配置
 * @param {boolean} first - 是否为第一次调用此函数（顶层菜单项）
 */
export const formatPath = (ele, first) => {
  // 默认属性配置
  const propsDefault = website.menu;

  // 处理图标
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = !icon ? propsDefault.iconDefault : icon;

  // 确保meta属性存在
  ele.meta = ele.meta || {};

  // iframe组件路径
  const iframeComponent = 'components/iframe/main';

  // 处理外部链接的href，将其转换为iframe的src
  const iframeSrc = (href) => {
    return href.replace(/&/g, '#');
  };

  // 判断当前菜单项是否有子项
  const isChild = !!(ele[propsDefault.children] && ele[propsDefault.children].length !== 0);

  if (!isChild && first) {
    // 对于没有子项的菜单项，且是第一次调用，设置其组件路径
    ele.component = `views${ele[propsDefault.path]}`;

    // 如果菜单项的href是外部链接，则将其在iframe中打开
    if (isURL(ele[propsDefault.href])) {
      const href = ele[propsDefault.href];
      ele.component = iframeComponent;
      ele[propsDefault.query] = { url: iframeSrc(href) };
    }
  } else {
    // 对有子项的菜单项，递归处理每个子项
    ele[propsDefault.children] &&
      ele[propsDefault.children].forEach((child) => {
        child.component = `views${child[propsDefault.path]}`;

        // 如果子项的href是外部链接，则将其在iframe中打开，并调整其路径和查询参数
        if (isURL(child[propsDefault.href])) {
          const href = child[propsDefault.href];
          child[propsDefault.path] = `${ele[propsDefault.path]}/${child.code}`;
          child.component = iframeComponent;
          child[propsDefault.query] = { url: iframeSrc(href) };
        }

        // 递归调用，继续处理下一级子项
        formatPath(child);
      });
  }
};
export default RouterPlugin;
