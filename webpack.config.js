const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const PAGES_DIR = path.resolve(__dirname, 'src/pug');

// Function to get all Pug files, including subdirectories
const getAllPugFiles = (dir, files = []) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      getAllPugFiles(fullPath, files);
    } else if (dirent.isFile() && dirent.name.endsWith('.pug')) {
      files.push(fullPath);
    }
  });
  return files;
};

// Get all `.pug` files (including inside `about-us/` and `components/`)
const PUG_FILES = getAllPugFiles(PAGES_DIR);

module.exports = {
  mode: 'development', // Change to 'development' for localhost
  entry: './src/js/main.js',
  output: {
    filename: 'assets/js/main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/main.min.css',
    }),
    ...PUG_FILES.map(file => new HtmlWebpackPlugin({
      template: file,
      filename: path.relative(PAGES_DIR, file).replace('.pug', '.html'),
      minify: false, // Disable minification
    })),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 3000, // Change the port if needed
    open: true, // Automatically opens browser
    hot: true, // Enables Hot Module Replacement (HMR)
  },
};
