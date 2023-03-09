const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: 'docs',
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'SEVENTEEN 聖地MAP',
    }
  }
})
