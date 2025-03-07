module.exports =  {
    type: "work",
    draft: true,
    archived: false, 
    layout: "test.html",
    weight: 50,
    date_range:"",
    image: "",
    tags: [],
    eleventyComputed: {
        metaTitle: function(data){
            return `${data.title} | ${data.site.title}`
        },
        metaDesc: "{{desc | strip_html}}",
        sections: function(data) {
            return data.collections.allSections.filter(s =>{
                return s.data.page.filePathStem.includes(data.page.fileSlug)
                })
            }
    }
}