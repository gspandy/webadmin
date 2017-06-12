var path = require('path')
// var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      // 'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'pgviews': path.resolve(__dirname, '../src/views'),
      'components': path.resolve(__dirname, '../src/components'),
      'less_defined': path.resolve(__dirname, '../src/styles/defined.less'),
      'less_public': path.resolve(__dirname, '../src/styles/public.less'),
      'api': path.resolve(__dirname, '../src/api')
    }
  },
  // plugins: [
  //   new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ]  } })
  // ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders:vueLoaderConfig.loaders,
            // vue-loader options go here
            postcss: [require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })]
        }
        // options:vueLoaderConfig
        // options: {
        //   vueLoaderConfig,
        //   'scss': 'vue-style-loader!css-loader?-autoprefixer!sass-loader!postcss-loader',
        //   'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        // }
      },
      {
          test: /\.less$/,
          loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
