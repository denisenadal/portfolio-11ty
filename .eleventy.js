const markdownIt = require("markdown-it");
const xmlFiltersPlugin = require('eleventy-xml-plugin')
require('dotenv').config()

const colors = ["primary","secondary","success","danger","warning","info","light","dark"];
let tagBK =[];

module.exports = function (eleventyConfig) {
  // setup server config & browersync
  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy("src/pages/*/assets")
  eleventyConfig.addWatchTarget("assets/css/");
  eleventyConfig.addWatchTarget("src/pages/*/assets");
  eleventyConfig.addWatchTarget("src/pages");
  // eleventyConfig.addWatchTarget("src/pages/*/*.{png,jpeg,jpg,webp,webm,mp4,css,js,svg} ");
  //eleventyConfig.addPassthroughCopy("src/admin")
  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.setBrowserSyncConfig({ notify: true });


  //set up coolections & data
  const site = require('./src/_data/site.js');
  site.colors = colors;

  eleventyConfig.addCollection("allSections", async (collectionsApi) => {
    return collectionsApi.getAll().filter(function (item) {
      if ( item.page.filePathStem.includes('work') && item.page.filePathStem.includes('0') && item.data.draft !== true) {
        return true
      }
    }).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by date - descending
    });
  });
  eleventyConfig.addCollection("allWork", async (collectionsApi) => {
    return collectionsApi.getAll().filter(function (item) {
      // Side-step tags and do your own filtering
      if (item.data.type == 'work' && !item.page.filePathStem.includes('0')) {
        return !item.data.draft;
      }
    }).sort(function (a, b) {
        return b.date - a.date; // sort by date - descending
      });
  });
  eleventyConfig.addCollection("featuredWork", async (collectionsApi) => {
    return collectionsApi.getAll()
      .filter(function (item) {
        if (item.page.filePathStem.includes('work') && !item.page.filePathStem.includes('0')) {
          return !item.data.draft && item.data.featured 
        }
      }).sort(function (a, b) {
        return b.weight - a.weight; // sort by date - descending
      });
  });
  eleventyConfig.addCollection("allPosts", async (collectionsApi) => {
    return collectionsApi.getAll().filter(function (item) {
      // Side-step tags and do your own filtering
      if (item.page.filePathStem.includes('post') ) {
        return !item.data.draft;
      }
    }).sort(function (a, b) {
        return b.date - a.date; // sort by date - descending
      });
  });
  eleventyConfig.addCollection("allTags", async (collectionsApi) => {
     const taggedItems = collectionsApi.getAll().filter(function (item) {
      return item.data.tags; 
    })
    const tags =[];
    taggedItems.forEach(item => {
      item.data.tags.forEach(itemsTag =>{
        let currentTag = tags.find(t =>{return t.title == itemsTag});
        if(currentTag){
          currentTag.count ++;
        }
        else {
          let i = tags.length || 0;
          let max = colors.length - 1;
          while (i > max) {
            i= i -max;
          }
          tags.push({
            title: itemsTag,
            desc: `Things tagged with ${itemsTag}`,
            rawInput:  `Things tagged with ${itemsTag}`,
            content:  `<p>Things tagged with ${itemsTag}</p>`,
            count: 1,
            color: colors[i]
          })
        }
       
      })
    })
    const sortedTags = tags.sort(function (a, b) {
        return a - b; // sort by date - descending
      });
    if(tagBK.length == 0 ){
      tagBK = tags;
    }
    return sortedTags;
  });

  //set up content rules
  eleventyConfig.setLiquidOptions({ jsTruthy: true });
  eleventyConfig.setFrontMatterParsingOptions({ excerpt: true, });
  eleventyConfig.addPlugin(xmlFiltersPlugin)
  eleventyConfig.addGlobalData("tagData",  tagBK);

  //set up shortcodes
  eleventyConfig.addShortcode("button", function (link, title, classes) {
    return `<a href='${link}' class='btn ${classes}'>${title} </a>`
  });
  eleventyConfig.addShortcode("hr", function () {
    return `<hr class="content-divider clear-both">`
  });
  eleventyConfig.addShortcode("workimage", function (src, classes, alt, caption,) {
    let classStr = "class='image-modal-link d-block'"
    classStr += classes ? classes : "";
    let captionStr = '';
    if (caption) {
      captionStr = "<figcaption>" + caption + "</figcaption>";
    }
    return `<a href='${src}' ${classStr}>
    <figure class="workimg-figure">
        <img src='${src}'
             alt='${alt}' />
       ${captionStr}
    </figure>
</a>`
  });



  //setup filters 
  eleventyConfig.addFilter("md", function (content = "") {
    return markdownIt({ html: true }).render(content);
  });
  eleventyConfig.addFilter("ISODate", function (content = new Date()) {
    return content.toISOString();
  });
  /**
 * Prefixes the given URL with the site's base URL.
 * @param {string} url
 */
  eleventyConfig.addFilter('absoluteUrl', function (url) {
    if (!url) {
      return '';
    }
    if (url.startsWith("http")) {
      return url;
    }
    if (!url.startsWith('/')) {
      url = '/' + this.page.fileSlug + '/' + url
      if (site.isDev) {
        url = '/pages' + url
      }

    }
    return site.baseUrl + url
    return url;
  });

  eleventyConfig.addFilter("filterByTag", function (arr, value) {
    // console.log(this)
    const filtered =  arr.filter((item) => {
      return item.data.tags.includes(value)
    });
    return filtered
  });
  eleventyConfig.addFilter("getTagColor", function (arr, value) {
    const filtered =  arr.find((item) => {
      return item.title === value;
    });
    if(filtered && filtered.color){
      return filtered.color
    }
    return 'dark'
  });
  eleventyConfig.addFilter("formatSectionID", function (content = "") {
    const regex = /[0-9-\s]/gm;
    content = content.replace(regex, "");
    content = eleventyConfig.getFilter("slugify")(content)
    return content
  });

  return {
    templateFormats: [
      "md",
      "njk",
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
