# react-native-creater

> React-native快速项目创建。已经集成了构建一个完整项目的主要功能库。

> Android测试有效。

## 1. 包含组件库

+ 基础 [react-native](https://github.com/facebook/react-native)
+ TS语法检查 [tslint](https://github.com/palantir/tslint)
+ 状态管理 [redux](https://github.com/reduxjs/redux)
+ React/Redux连接 [react-redux](https://github.com/reduxjs/react-redux)
+ React持久化 [react-persist](https://github.com/rt2zz/redux-persist)
+ 导航 [react-navigation](https://github.com/react-navigation/react-navigation)
+ UI组件 [react-native-elements](https://github.com/react-native-training/react-native-elements)

## 2. 使用说明

创建命令：
```
node ./index.js
```

创建后项目命令：
``` bash
# Debug运行
npm run start
# Release构建
npm run build
# Release测试安装
npm run install-test
# tslint检测
npm run lint
# tslint检测和自动修正
npm run lint-fix
```

确认可以测试安装成功后，可以到`android/app/build/outputs/apk/release/`下，获取release版apk文件。

### 2.1. 虚拟机调试

使用[Genymotion](https://www.genymotion.com/)。创建一个Android API为`9.0- API 28`的设备并启动。

## 3. 项目结构

源码目录：
```
| app
|---| compenents/
|---|---| ItemList.tsx
|---|---| Item.tsx
|---| containers/
|---|---| App.tsx
|---| store/
|---|---| models.tsx
|---|---| reducers.tsx
|---|---| actions.tsx
|---|---| index.tsx
|---| navigation.tsx
|---| index.tsx
```

其中：
+ `/index.tsx` 是入口文件。导出一个注册了Redux的Component
+ `/navigation.tsx` 是导航配置文件。整合所有Containers并导出唯一有导航的Container
+ `/compenents/` 目录放置组件，导出Component
+ `/containers/` 目录放置页面Container，导出Component，其中使用了组件
+ `/store/` 目录放置Redux相关
+ `/store/models.tsx` 定义数据类型接口
+ `/store/actions.tsx` 定义actions和actions调用函数
+ `/store/reducers/` 目录放置reducers
+ `/store/index.tsx` 文件创建和导出store
