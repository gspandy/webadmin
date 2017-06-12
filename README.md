# 鲜花说

> 鲜花说管理后台前端

``` bash
# 初始化项目
npm install

# 启动服务，服务URL：http://localhost:8080
npm run dev

# 打包成生产代码
npm run build

```
### 目录结构

```
.
├── README.md           
├── dist                     // 项目build目录
├── src                      // 生产目录
│   ├── api                  // API 请求
│   ├── assets               // css 和图片资源
│   ├── components           // 组件
│   ├── utils                // 工具函数
│   └── vuex            		 // vuex相关文件, store,action
│   └── routes               // 路由配置
│   └── main.js              // 入口文件
│   └── App.vue             // 主页
├── .babelrc                 // babel配置
├── .eslintrc.json           // eslint配置
├── build                     // 开发环境配置目录
    ├── webpack.base.config.js    // Webpack基础配置
    ├── webpack.dev.config.js    // 开发环境Webpack配置文件
    └── webpack.prod.config.js   // 生产环境Webpack 配置文件

```