// const path = require('path')

module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  devServer: {
    // contentBase: path.resolve('src'),
    hot: true,
    open: false,
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000/.netlify/functions/server/',
        secure: false
      }
    }
  },
  pages: {
    index: {
      // entry for the page
      entry: 'main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'SaleRobot',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      // Note: this option is named as "prependData" in sass-loader v8
      scss: {
        additionalData: `@import "~@/styles/variables.scss";`
      }
    }
  }
}