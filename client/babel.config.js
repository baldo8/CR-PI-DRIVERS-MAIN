// babel.config.js
module.exports = (api) => {
    api.cache(true);
  
    return {
      presets: ["@babel/preset-react"],
      // Other Babel presets and plugins
    };
  };
  