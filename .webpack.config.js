const path = require('path')

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./public")
  },
  entry: path.resolve(__dirname, "./views/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },

      {
        test: /\.(js|jsx)$/i,
        use: [
          {
            loader: 'babel-loader',
            query: {
              compact: false
            }
          }
        ],
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
}
