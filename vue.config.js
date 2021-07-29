const path = require('path')
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = {
  publicPath :'./',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title= 'xx科技'
          return args
        });
          config.module
              .rule('svg')
              .exclude.add(resolve('src/assets/icons/svg'))
              .end();
          config.module
              .rule('icons')
              .test(/\.svg$/)
              .include.add(resolve('src/assets/icons/svg'))
              .end()
              .use('svg-sprite-loader')
              .loader('svg-sprite-loader')
              .options({
                  symbolId: 'icon-[name]',
              })
              .end();

      },

}