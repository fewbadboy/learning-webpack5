const { BannerPlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const yaml = require('yamljs')
const json5 = require('json5')

module.exports = {
  mode: 'development',
  entry: {
    about: './src/pages/about/about.js',
    index: './src/pages/index/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 10,
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('/'),
        VERSION: JSON.stringify('5fa3b9')
      }
    }),
    new BannerPlugin({
      banner: `Author: fewbadboy \nTime: ${new Date().toLocaleString()}`
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'about',
      filename: 'about.html',
      template: './public/about.html',
      chunks: ['about']
    })
  ]
}
