##  项目描述
大模型数据分析平台前端代码

精确管理调度系统是一款集资源管理、业务下发、网络可视化、告警管理等多项能力于一体的软件产品，核心模块包括采集、资源管理、路径计算和业务下发，可为用户提供一系列网络智能化服务能力，方便快速支撑客户业务需求。

##  项目的基本结构
``` 
Project
├── mock -- 模拟数据配置
├── public -- 静态资源目录
├── src -- 源代码目录
├    ├── api -- 接口文件 
├    ├── components -- 自定义全局组件 
├    ├── config -- 全局配置文件 
├    ├── lang -- 多国语言包 
├    ├── option -- 通用数据文件 
├    ├── page -- 全局页面文件
├    ├── router -- 路由管理器文件 
├    ├── store -- 状态管理器文件 
├    ├── styles -- 全局样式配置文件 
├    ├── theme -- 全局主题配置 
├    ├── util -- 通用工具类 
├    ├── views -- index视图层目录 
├    ├── App.vue -- 项目主组件 
├    ├── main.js -- 项目启动文件 
├    └── permission.js -- 全局路由权限配置 
├── .env. -- 环境变量配置文件
├── .gitignore -- git配置文件
├── index.html -- 默认访问文件
├── .babel.config.js -- babel配置文件
├── .browserslistrc -- 浏览器适配版本
├── package.json -- 项目依赖包集合
└── vue.config.js -- vue配置文件
```
##  项目详细介绍
企业版SDN前端项目包括多个模块，各模块结构如下：
<img src="./doc/img/mvvm.png"/>

##  项目技术栈

###  技术框架
> 技术栈 —— avue.js 框架

###  UI组件库
> 技术栈 —— avue UI

文档地址：https://www.avuejs.com

###  基础构建工具
> 技术栈 —— NodeJs:14+

##  如何开发/运行/部署

下述命令需在 `根目录` 下执行

``` bash
# 安装依赖
npm install

# 开发模式
npm run serve


```

##  版本升级说明

[V1.0](doc/v1.0.0/v1.0.0.md)
