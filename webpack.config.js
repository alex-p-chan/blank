var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProd =process.env.NODE_ENV==='production';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
 entry: {app:'./src/js/app.js',
},
 output: { path: __dirname + "/dist", filename: '[name].bundle.js' },
devServer:{
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats:"errors-only",
    open:true
},
 plugins: [
  new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      title: 'Blank',
      minify: {
          collapseWhitespace: true
      },
      inject:true,
      hash:true,
      template: './src/ejs/index.ejs', // Load a custom template (ejs by default see the FAQ for details) 
    })
  ],
 module: {
  loaders: [
   {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
     presets: ["es2015", "stage-0", "react"],
     plugins: ["react-html-attrs", "transform-class-properties","transform-decorators-legacy"]
    }
  },
    {
    test: /\.css$/,
   // exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'
        ]
    }),
},
{
    test: /\.scss$/,
//    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader','sass-loader']
    }),
},
{
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader?limit=10000',
  },
  {
    test: /\.otf?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader?limit=10000',
  },
  {
    test: /\.(ttf|eot|svg|png)(\?[\s\S]+)?$/,
    use: 'file-loader',
  },

  ]
 },
};