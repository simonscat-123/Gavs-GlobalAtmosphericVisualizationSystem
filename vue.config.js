const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
  outputDir: 'build',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // configureWebpack: {
  //   resolve: {
  //     extensions: ['.js', '.vue', '.json'],
  //     alias: {
  //       '@': path.resolve('src'),
  //     },
  //   },
  // },
  chainWebpack: (config) => {
    // 设置路径别名
    config.resolve.alias
      .set('@', resolve('src'));

    // 查看打包文件体积大小
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  },
};
