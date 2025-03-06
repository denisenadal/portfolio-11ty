module.exports =  {
    type: "blog",
    draft: true,
    date_range:"",
    image: "",
    tags: [],
    eleventyComputed: {
        metaTitle: "{{title}} - {{site.name}}",
        metaDesc: "{{desc | strip_html}}",
        sections: function(data) {
            return data.collections.allSections.filter(s =>{
                return s.data.page.filePathStem.includes(data.page.fileSlug)
                })
            }
    }
}