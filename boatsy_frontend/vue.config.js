module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: '0.0.0.0:8000',
    proxy: 'http://localhost:8000/',
  },

  transpileDependencies: ["vuetify", "quasar"],
  runtimeCompiler: true,
  outputDir: "../boatsy_middleware/public",
  assetsDir: "./vueassets",
  chainWebpack: config => {
    config.module.rules.delete("eslint");
    if (process.env.NODE_ENV === "production") {
      config.plugin("html").tap(args => {
        return [
          { filename: "../vue_index/index.html", template: "public/index.html" }
        ];
      });
    }
  },

  css: {
    modules: false,
    sourceMap: process.env.NODE_ENV !== "production"
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  }
};
