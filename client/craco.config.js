const CracoLessPlugin = require("craco-less");
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@utils': path.resolve(__dirname, "./src/utils"),
      '@components': path.resolve(__dirname, "./src/components"),
      '@images': path.resolve(__dirname, "./src/images"),
      '@pages': path.resolve(__dirname, "./src/pages"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#2bc3e9" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
