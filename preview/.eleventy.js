module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./*.js");
  eleventyConfig.addPassthroughCopy("./*.js.map");
  eleventyConfig.addPassthroughCopy("./*.css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");

  return {
    dir: {
      input: "index.njk",
      includes: "_includes",
      data: "_data",
      output: "_dotcomchrome"
    },
    templateFormats: ["njk"],
  }
};
