const markdownIt = require("markdown-it");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy("src/pages/*/assets")
  //eleventyConfig.addPassthroughCopy("src/admin")
  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  eleventyConfig.addCollection("allSections", async (collectionsApi) => {
		return collectionsApi.getAll().filter(function (item) {
      if(item.page.filePathStem.includes('section0')){
      return true
      }
		});
	});

  eleventyConfig.addCollection("allPosts", async (collectionsApi) => {
		// get unsorted items
		return collectionsApi.getAll().filter(function (item) {
			// Side-step tags and do your own filtering
      if(item.page.filePathStem.includes('post') && !item.page.filePathStem.includes('section')){
      return true
      }
		});
	});


  eleventyConfig.setLiquidOptions({ jsTruthy: true });

  eleventyConfig.addWatchTarget("assets/css/");
  eleventyConfig.addWatchTarget("src/pages/*/assets");
  eleventyConfig.addWatchTarget("src/pages");
  // eleventyConfig.addWatchTarget("src/pages/*/*.{png,jpeg,jpg,webp,webm,mp4,css,js,svg} ");

  eleventyConfig.ignores.add("src/pages/*/assets/*.md");
  eleventyConfig.ignores.add("src/pages/*/embeddable.html");

  eleventyConfig.setBrowserSyncConfig({notify: true});

  eleventyConfig.setFrontMatterParsingOptions({ excerpt: true, });

  eleventyConfig.addFilter("md", function (content = "") {
    return markdownIt({ html: true }).render(content);
  });
  eleventyConfig.addFilter("ISODate", function (content = new Date()) {
    return content.toISOString();
  });

  const site = require('./src/_data/site.js');

  /**
   * Prefixes the given URL with the site's base URL.
   * @param {string} url
   */
  

  eleventyConfig.addFilter('absoluteUrl', function(url) {
    if(!url){
      return '';
    }
    if(url.startsWith("http")){
      return url;
    }
    if(!url.startsWith('/') ){
      url = '/'+ this.page.fileSlug + '/'+ url
      if(site.isDev){
        url = '/pages'+ url
      }
      
    }
    return site.baseUrl + url 
    return url;
  });

  return {
		templateFormats: [
      "md",
			"html",
			"liquid",
      "jpg",
      "png",
      "webp",
      "svg",
      "css",
      "js",
      "webm",
      "mp4"
		],
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
			layouts: "_layouts"
    }
  }
}
