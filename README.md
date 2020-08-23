# Tunnel_Eye_App

## Description

Tunnel Eye App, typescript version.

## Project setup

``` bash
# Install dependencies
yarn install
```

``` bash
# Compiles and hot-reloads for development
yarn serve
```

``` bash
# Compiles and minifies for production
yarn build
```

``` bash
# Lints and fixes files
yarn lint
```

## Version

### 0.0.1

1. 初始化
2. 搭建项目环境
3. 配置插件

### 0.0.2

1. 完成登录页面
2. 完成接口部分
3. 完成Vuex

### 0.0.3

1. 完成Init页面
2. 完成Location页面

### 0.0.4

1. 完成了UserInfo页面

### 0.0.5

1. 完成了PersonInfo页面
2. 完成了PersonList组件

### 0.0.6

1. 完成了Analysis页面
2. 完成了Warning页面
3. 设置了路由守卫
4. 移动App与Web App测试均成功
5. TS重构基本完毕

### 0.1.1

1. 对sessionStorage进行加密处理

### 0.1.2

1. 修复了账户信息没有对sessionStorage解密而不能显示的问题
2. 修复了环境监测页面切换出现的问题
3. 修复了环境监测页面每次切换节点会自动定位的问题
4. 修复了出勤页面切换日期班组不能定位的问题

### 0.1.3

1. 统一使用moment库管理时间
2. 改进了一些Typescript规范
3. 调整了环境监测统计图显示区间
4. 登录成功采用replace替换push

### 0.1.4

1. 完成了获取当前位置
2. 能根据ip返回天气并显示

### 0.1.5

1. 修复了不能显示天气存在的bug
2. 新增从后台获取IP的接口

### 0.1.6

1. 完成了预警信息列表
2. 完成了预警正文页面

### 0.2.1

1. 概念版发布

### 0.2.2

1. 完成平面图的绘制
2. 完成人员定位的交互

### 0.2.3

1. 修复了底色有差异的问题
2. 修复了预警程度不能及时显示的问题

### 0.2.4

1. 抽离了定位信息列表组件
2. 完善了切换地点显示功能

### 0.2.5

1. 加入了平面图标志指示
2. 加入了等待加载的动态图
3. 解决了预警页面等待天气过程而列表加载慢的bug

### 0.2.6

1. 修复了top栏日期错误的bug
2. 交互的平面图数据
3. 让登录页面变为滑动，适应键盘的出现

### 0.3.1

1. 人员定位页面进行交大改动，将下位机与主控机逻辑区分开
2. App名字改动
3. 修复了一些bug
