const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = defineConfig({
    publicPath: './',
    productionSourceMap:false,
    transpileDependencies: true,
    lintOnSave: false,
    //代理
    devServer: {
        proxy: {
            '/api': {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
    },
    configureWebpack: (config) => {
        config.resolve = {
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
            config.plugins.push(
                new BundleAnalyzerPlugin(),

            )
    },

});
