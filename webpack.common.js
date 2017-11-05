const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './lib/index.ejs',
  filename: 'index.html',
  inject: 'body',
});
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './lib/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  module: {
      rules: [
    // {
    //   test: /\.js$/,
    //   loader: 'eslint-loader',
    //   exclude: /node_modules/,
    // },
    {
      test: /\.ts?$/, // Another convention is to use the .es6 filetype, but you then
      // have to supply that explicitly in import statements, which isn't cool.
      exclude: [/(node_modules|bower_components)/],
      loader: 'ts-loader',
      // loaders: ['babel-loader', 'ts-loader'],
    },
    {
      test: /\.js?$/, // Another convention is to use the .es6 filetype, but you then
      // have to supply that explicitly in import statements, which isn't cool.
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    },
    // This nifty bit of magic right here allows us to load entire JSON files
    // synchronously using `require`, just like in NodeJS.
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
    // This allows you to `require` CSS files.
    // We be in JavaScript land here, baby! No <style> tags for us!
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
       options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
          delimiter: ',',
          newline: '\r',
        },
    },
    // loaders: [
    //   {
    //     test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
    //   },
    //   {
    //     test: /\.csv$/,
    //     loader: 'csv-loader',
    //     options: {
    //       dynamicTyping: true,
    //       header: true,
    //       skipEmptyLines: true,
    //       delimiter: ',',
    //       newline: '\r',
    //     },
    //   },
    // ],
  // },
  ],
},
  plugins: [
    new CleanWebpackPlugin(['docs']),
    new CopyWebpackPlugin([
      {from: 'data/output/', to:'data'}
    ]),
    HtmlWebpackPluginConfig,
  ],
};


