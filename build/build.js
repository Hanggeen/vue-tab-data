'use strict'
const webpack = require('webpack')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

webpack({
  mode: 'production',
  entry:path.join(__dirname, '../src/index.js'),
  output:{
      path:path.join(__dirname,'../dist'),
      filename:'vue-tab-data.js',
      libraryTarget: "umd",  //一套完整的规范 cmd  amd
      library: 'vue-tab-data'  //库的名字
  },
  module:{
      rules:[
          {
             test:/\.js$/,
             loader:'babel-loader',
             include:path.join(__dirname,'../src'),
             exclude:/node_modules/
          }
      ]
  },
  plugins: [
  ]
}, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log('  Build failed with errors.\n')
    process.exit(1)
  }

  console.log('  Build complete.\n')
  console.log(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  )
})