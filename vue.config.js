module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].description = "Words are worth 16 million colors";
      return args;
    });
  },
  pwa: {
    themeColor: "#000000",
  },
};
