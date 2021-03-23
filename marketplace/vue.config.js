module.exports = {
  transpileDependencies: ['vuetify'],
  runtimeCompiler: true,

  css: {
    sourceMap: true
  },
  devServer: {
    proxy: process.env.VUE_APP_ROOT_API
  }
}
