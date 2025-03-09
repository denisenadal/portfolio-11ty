module.exports =  {
    type: "work",
    draft: true,
    archived: false, 
    layout: "work-single.html",
    weight: 50,
    date_range:"",
    image: "", 
    tags: [],
    eleventyComputed: {
        metaTitle: function(data){
            return `${data.title} | ${data.site.title}`
        },
        metaDesc: function(data){
            let desc = "";
            if(!data.desc){
                let content = data.page.rawInput;
                content = content.replace(/(<([^>]+)>)/gi, "");
                desc = content.length > 250 ? content.slice(0, 249) + '&hellip;' : content;
            }
            return desc;
        },
        sections: function(data) {
            return data.collections.allSections.filter(s =>{
                return s.data.page.filePathStem.includes(data.page.fileSlug)
                }).sort(function(a,b){
                    return a.page.filePathStem - b.page.filePathStem
                })
            }
    }
}