waitForElm("footer.footer").then(()=>{
    const { animate, scroll, inView } = Motion

    const heroSequence = [
         [".bio-photo", { maxWidth:250 }, { duration: .5, ease: [0.175, 0.885, 0.320, 1.275] }],
         [".bio-photo", { boxShadow: " 70px 28px 0 4px rgba(249, 255, 0, .18), -70px 28px 0 4px rgba(0, 232, 255, .18), 0px -70px 0 4px rgba(255, 0, 0, .18)" }, { duration: .5, delay: 0, ease: [0.230, 1.000, 0.320, 1.000] }],
         [".hero .text-col", { opacity: 1}, { duration: .5, ease:[0.470, 0.000, 0.745, 0.715]}]
        ];
    animate(heroSequence)



    const sections = document.querySelectorAll("main >section:not(.hero)")
    
    sections.forEach((section)=>{
        const sectionSequence = [
            [section.firstElementChild, { opacity:1 }, { duration: .5, ease: [0.470, 0.000, 0.745, 0.715] }],
        ]
        const offset = section.id == "work"? .25 : .5;
        inView(section,(el, info)=>{
            animate(sectionSequence)

            return (leaveInfo)=>{
                const reverse =[
                    [section.firstElementChild, { opacity:0 }, { duration: .5, ease: [0.470, 0.000, 0.745, 0.715] }],
                ]
                animate(reverse)
            }
        },{amount:offset})
    })
    


    const socialLinks = document.querySelectorAll(".social-links a")
    socialLinks.forEach((link)=>{
        link.addEventListener("mouseover",(e)=>{
            const color = link.dataset.indexcolor
            link.querySelector("i").style.color = "var(--"+color+")";
        })
        link.addEventListener("mouseout",(e)=>{
            const color = link.dataset.indexcolor
            link.querySelector("i").style.color = "inherit";
        })
    })
})

