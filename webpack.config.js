module.exports = {
  entry: './js/main.js',
  output: {
    path: './dist',
    filename: 'main.js',
    libraryTarget: 'umd',
    library: 'shoebox'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader?presets[]=es2015'
    }]
  }
}