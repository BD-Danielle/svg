const path = require('path'); // nodeJS core module for dealing with Path

module.exports = {
  mode: "production", // or development
  entry: "./js/main.line-graph.js", // use Relative Path
  output: {
    // whole files output here
    path: path.resolve(__dirname, "./js/webpack"), // must use Path
    filename: "main.line-graph.bundle.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // only check css files
        use: ["style-loader", "css-loader"] // right -> left, bottom -> top
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小於10kb的圖片轉base64
            // 優點: 減少請求數量 <-> 缺點: 體積會更大
            maxSize: 10*1024
          }
        },
        generator: {
          // 輸出圖片名稱f
          // [hash: 4] hash值取前4位
          filename: "static/images[hash:4][ext][query]"
        }
      }
    ],
  },
  plugins: [],
}