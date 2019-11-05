const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// PLUGIN : HERE

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const postcssNested = require('postcss-nested');



const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'
const ASSET_PATH = process.env.ASSET_PATH || '/';
const cssLoader = {
    loader: "css-loader"    
};

cssLoader.options = {
   // minimize: true
      // enable CSS Modules
      // modules: true,
      // customize generated class names
      // localIdentName: '[local]_[hash:base64:8]',
      sourceMap: true,
      url: false,
      importLoaders: 1,    
};

module.exports = {
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: [
    './app.js',
    './src/css/app.css',
    './src/css/foundation.css',
  ],
  output: {
    path: path.resolve(__dirname, './src/build'),
    filename: '[name].bundle.js',
    // publicPath: ASSET_PATH
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,      
        use: [
          // { loader: MiniCssExtractPlugin.loader },
          'vue-style-loader',
          cssLoader,
          // {
          //   loader: 'css-loader',
          //   options: {         
          //     sourceMap: true,
          //     url: false,
          //     importLoaders: 1,
          //   }        
          // },
          // {
          //   loader: 'sass-loader', 
          //   options: {
          //     sourceMap: true, 
          //   }
          // },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     sourceMap: true,
          //   }
          // }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        include: [
          path.resolve(__dirname, 'src/images')
        ],
        exclude: /node_modules/,
        use:[
          {
            loader: 'file-loader',
            options: {              
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            },
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/'
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),   
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',      
    }),
   
    new HtmlWebpackPlugin({       
      template: './index.html',
    }),
     
    new webpack.ProvidePlugin({
      // $: "jquery",
      // jQuery: "jquery",      
      // "window.jQuery": "jquery",
      // "Tether": 'tether'
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }), 
    // new BrowserSyncPlugin(
    //   {
    //     // browse to http://localhost:3000/ during development,
    //     // ./public directory is being served

    //     host: 'localhost',
    //     port: 4922,
    //     logLevel: 'silent',
    //     proxy: 'http://chaba.test', //http://localhost:9009/
    //     files: [
    //       {
    //         match: [
    //           path.join(__dirname, './*.hbs'),
    //           path.join(__dirname, './src/scss/*.scss'),
    //           path.join(__dirname, './src/scss/*/*.scss'),
    //         ],
    //         fn: function(event, file) {
    //           if (event === "change") {
    //             const bs = require('browser-sync').get('bs-webpack-plugin');
    //             bs.reload();
    //           }
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     // prevent BrowserSync from reloading the page
    //     // and let Webpack Dev Server take care of this
    //     reload: true
    //   }
    // )
  ],  
  resolve: {
    // extensions: ['.hbs'],
    modules: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /styles\.scss$/,          
          chunks: 'all',
          enforce: true
        }        
      }

    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
};
