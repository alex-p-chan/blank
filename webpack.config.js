var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProd =process.env.NODE_ENV==='production';
var bootstrapEntryPoints =  require("./webpack.bootstrap.config");
var bootstrapConfig = isProd?bootstrapEntryPoints.prod:bootstrapEntryPoints.dev;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
 entry: {app:'./src/js/app.js',
 bootstrap:bootstrapConfig
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
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: "exports-loader?Util!bootstrap/js/dist/util",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
      }),
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
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader',
  },
  { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },

  ]
 },
};