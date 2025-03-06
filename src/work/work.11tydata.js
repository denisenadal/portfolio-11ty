module.exports =  {
    type: "work",
    draft: true,
    layout: "work/case-study.html",
    weight: 50,
    date:"",
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