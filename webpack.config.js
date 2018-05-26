const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const {
    resolve
} = require('path');

module.exports = {
    entry: {
        base: resolve(__dirname, "./src/main.js")
    },
    output: {
        path: resolve(__dirname, "./dist"),
        filename: "./[name].bundle.js"
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }]
    },
    plugins: [
        new webpack.BannerPlugin(" 版权所有，翻版算球"),
        new CleanWebpackPlugin(
            ['./dist/*.*'], {
                root: resolve(__dirname, "./"),
                verbose: true,
                dry: false
            })
    ]
}