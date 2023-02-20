const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      // header: '/src/js/header.js',
      // editor: '/src/js/editor.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin that generates our html file and injects our bundles. 
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

       // Creates a manifest.json file.
       new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Always have somewhere to sort your thoughts!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            //logos will come from this file in the src folder
            src: path.resolve('src/images/logo.png'),
            //produce these size images
            sizes: [96, 128, 192, 256, 384, 512],
            // this is the destination path for the images
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // check for .css files using regex
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // check .js or .mjs files
          test: /\.m?js$/,
          //exclude the node_modules folder
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            // babel is the transpiler we'll use to transpile our code
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
