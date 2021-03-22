
import path from 'path';
export default {
  mode: 'development',
  entry: ["@babel/polyfill", "./public/src/main.js"],
  watch: true,
  output: {
    path: path.resolve(process.cwd(), "public"),
    filename: 'main_bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(process.cwd(), "public"),
      ],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader?presets[]=es2015',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    },],
  },
  devtool: 'source-map',
}