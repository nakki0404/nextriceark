const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 환경 변수를 사용하여 모드를 결정합니다. 기본값은 'development'입니다.
const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  target: "node", // Node.js 환경을 명시
  entry: "./app.js", // 서버 사이드 진입점 파일
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  externals: [nodeExternals()], // Node.js 모듈을 번들에서 제외
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
  // 개발 모드일 때만 소스맵을 생성합니다.
  devtool: mode === "development" ? "source-map" : false,
};

// 프로덕션 모드일 때만 CleanWebpackPlugin을 사용하여 dist 폴더를 정리합니다.
if (mode === "production") {
  module.exports.plugins.push(new CleanWebpackPlugin());
}
