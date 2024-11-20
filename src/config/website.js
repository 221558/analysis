/**
 * 全局配置文件
 */
export default {
  // 标题
  title: 'saber',
  // logo
  logo: 'A',
  key: 'saber', // 配置主键,目前用于存储
  indexTitle: 'Saber Admin',
  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  captchaMode: true, // 是否开启验证码模式
  tokenTime: 3000, // token过期时间
  Authorization: 'Blade-Auth',
  // http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  // 配置首页不可关闭
  setting: {
    // 侧边栏样式，vertical为垂直
    sidebar: 'vertical',
    // 是否显示标签页
    tag: false,
    // 是否为开发环境
    debug: process.env.NODE_ENV === 'development',
    // 是否折叠侧边栏
    collapse: true,
    // 是否显示搜索框
    search: false,
    // 是否锁定侧边栏
    lock: false,
    // 是否显示截图功能
    screenshot: false,
    // 是否显示全屏功能
    fullscren: false,
    // 是否显示主题切换功能
    theme: false,
    // 是否显示菜单
    menu: false,
    // 是否显示语言切换功能
    lang: false,
  },
  fistPage: {
    // 首页名称
    name: '首页',
    path: '/wel/index',
  },
  // 配置菜单的属性
  menu: {
    // 默认图标
    iconDefault: 'icon-caidan',
    // 标签
    label: 'name',
    // 路径
    path: 'path',
    // 图标
    icon: 'source',
    // 子菜单
    children: 'children',
    // 查询
    query: 'query',
    // 链接
    href: 'path',
    // 元数据
    meta: 'meta',
  },
  // auth配置
  auth: {
    // 使用后端工程 @org.springblade.test.Sm2KeyGenerator 获取
    publicKey: '04087d79d7c7c344489aee90eafafc062da3e69285560abf29f585b2c5015712cea14f1e8cab9380cb4eaf80617dd17d25fc45e73bdc8bcaa728cd7dcfd74fcdcd',
  },
  // 授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
};
