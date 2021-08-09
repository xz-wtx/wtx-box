const CompressionPlugin = require('compression-webpack-plugin')
//顶部设置变量
const Timestamp= new Date().getTime()
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = {
  publicPath :'./',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
      // 生产环境，开启js\css压缩
      if (process.env.NODE_ENV === 'prod') {
          config.plugin('compressionPlugin').use(new CompressionPlugin({
              filename: '[path].gz[query]',
              //压缩算法
              algorithm: 'gzip',
              //匹配文件
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240, // 对超过10k的数据压缩
              minRatio: 0.8,
              deleteOriginalAssets: false // 删除源文件
          }))
      }
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
    configureWebpack: { // js 配置
        output: { // 输出重构  打包编译后的 文件名称
            filename: `js/[name].${process.env.NODE_ENV}.${Timestamp}.js`,
            chunkFilename: `js/[name].${process.env.NODE_ENV}.${Timestamp}.js`
        },
    },
    css: { // css 配置
        extract: {
            // 修改打包后css文件名
            filename: `css/[name].${Timestamp}.css`,
            chunkFilename: `css/[name].${Timestamp}.css`
        }
    },


}