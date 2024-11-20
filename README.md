# Saber

配套 SpringBlade 前端框架,提供 Vue2/Vue3 版本。

## 目录

- [简介](#简介)
- [安装](#安装)
- [使用方法](#使用方法)
- [注意事项](#注意事项)
- [版本更新日志](#版本更新日志)

## 项目描述

主要使用 Vue3 版本框架（`3.x`分支），在开源代码基础上添加了规范插件、提升开发效率插件，并上传到 sonar 平台进行了代码扫描。

## 项目基本结构

```
├── public  静态资源包
├── mock    模拟数据包
├── src
│   ├── api           接口集合包
│   ├── components    组件包
│   ├── config        环境设置集合
│   ├── docker        docker部署文件
│   ├── lang          语言翻译包
│   ├── max           mac主题配置
│   ├── mixins        mixins配置
│   ├── option        avue-crud表格配置示例
│   ├── page          页面框架集合
│   ├── router        路由集合
│   ├── store         vuex配置中心
│   ├── styles        CSS文件集合
│   ├── util         工具包集合
│   ├── views         开发视图合计
│   ├── error.js      错误信息提示文件
│   ├── main.js       项目入口全局配置
│   ├── axios.js      axios配置
│   ├── permission.js 全站权限配置
│   └── App.vue       vue 实例页
├── LICENSE         许可证
└── package.json    项目依赖版本
├── README.md       项目说明书
├── vite.config.js   vite配置

```

## 项目技术栈

- Vue
- ElementUIPlus
- Axios
- VueX
- vue-router
- avue
- tailwindcss

## 安装/开发/运行/部署

### 安装

```shell
yarn
```

### 开发\运行

```shell
yarn dev
```

### 部署

```shell
yarn build:prod
```

## 注意事项

### 配置项

1. node 版本要求：>=16.x

### 其他注意事项

1. sonar 配置根据项目实际需求。

## 版本更新日志

### [未发布]

无
