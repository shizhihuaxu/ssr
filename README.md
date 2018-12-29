## 项目说明

1. vue-ssr 的官方  demo [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0) 的 api 由于 使用了 Firebase, 无法获取数据。

2. vue-hackernews-2.0 使用的是webpack 3.x。

   本项目是我在结合官方 demo  学习ssr 过程中, 对官方demo 尝试一点改造，在改造过程中加深自己的理解。

3. 将使用webpack 4 改造项目。

4. 使用 mockjs 模拟请求数据。

## 部署方式

需要服务器上部署 node 环境，执行以下命令：

```
npm run build

npm run start
```

在浏览器上输入生成的 server  地址即可访问