const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CopyPlugin({  
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
    },
    extensions: ['.js', '.json'], 
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://slashslot:5000',
        changeOrigin: true,
      },
    ],
  },
};
