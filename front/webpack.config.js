const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var APP_PATH = path.resolve(__dirname, 'app');

module.exports = {
  entry: path.resolve(APP_PATH, 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        },
        exclude: /(node_modules)/,
      }, { test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /(node_modules)/,
      }, { test: /\.(png|jpg|jpeg$|gif|eot|otf|webp|ttf|woff|woff2|svg|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }, { test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: { javascriptEnabled: true }
        }]
      }, { test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "young",
    }),
    new webpack.ProvidePlugin({
      'Utils': 'Utils',
      'Request': 'Request',
      'Manba': 'Manba',
      'G': 'G',
      'browserHistory': 'browserHistory',
      'searchformat': 'searchformat',
      'Common': 'Common',
    })
  ],
  mode: 'development',
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 9520,
    "proxy": {
      "/api": {
        "target": "http://localhost:9521",
        logLevel: 'debug'
      },
      "/socket.io": {
        "target": "http://localhost:9521",
        logLevel: 'debug',
        ws: true,
      },
    }
  },
  resolve: {
    extensions: ['.js', '.jsx','.json', 'png', 'less', 'css', 'jpeg', 'gif'],
    alias: {
      'Utils': path.resolve(APP_PATH, './common/utils.js'),
      'Request': path.resolve(APP_PATH, './common/request.js'),
      'app': APP_PATH,
      "Manba": 'manba',
      'searchformat': 'query-string',
      'browserHistory': path.resolve(APP_PATH, 'common/history.js'),
      'G': path.resolve(APP_PATH, 'common/global-event.js'),
      'components': path.resolve(APP_PATH, './components'),
      'Common': path.resolve(APP_PATH, './common/common.js'),
    }
  },

};
