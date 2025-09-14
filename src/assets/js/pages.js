
// ================== ANIMATIONS ==========================//
waitForElm("#home- footer.footer").then(()=>{
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
        const offset = section.id == "work"? .1 : .5;
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
    

// ================== CSS for socal lnks ==========================//

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
waitForElm("#page-experience footer.footer").then(()=>{
    const { animate, scroll, inView } = Motion

    inView("#experience .header",(el, info)=>{
        animate(el,{opacity:1}, { duration: .5, ease: [0.470, 0.000, 0.745, 0.715] })

        return (leaveInfo)=>{
            animate(el, { opacity:0 }, { duration: .5, ease: [0.470, 0.000, 0.745, 0.715] })
        }
    },)
    const items = document.querySelectorAll(".timeline-icon")
    items.forEach(icon =>{
        inView(icon,(el, info)=>{
            const sequence = [
                [el.nextElementSibling, { opacity:1 }, { duration:.75, ease: [0.470, 0.000, 0.745, 0.715] }],
                [el.nextElementSibling, {  y:0 }, { duration:1, ease: [0.075, 0.820, 0.165, 1.000]}],
                [el.previousElementSibling, { opacity:1 }, { duration: 1, ease: [0.470, 0.000, 0.745, 0.715] ,delay: -0.5}],
            ]
            animate(sequence)


            return (leaveInfo)=>{
                animate(el.nextElementSibling, { opacity:0 }, { duration: 1, ease: [0.470, 0.000, 0.745, 0.715] })
                animate(el.previousElementSibling, { opacity:0 }, { duration: 1, ease: [0.470, 0.000, 0.745, 0.715] })
            }
        },{amount:1})
    })

    inView("#timeline",(el, info)=>{
        const items = document.querySelectorAll(".timeline-border")
        const seq=[]
        items.forEach(item=>{
            const  h = item.parentElement.parentElement.offsetHeight;
            seq.push([item.parentElement, { opacity:1 }, { duration:.25, ease: [0.215, 0.610, 0.355, 1.000] }])
            seq.push([item, { opacity:1 }, { duration:.125, ease: [0.215, 0.610, 0.355, 1.000] }])
            seq.push([item, { height: h+20,maxHeight: h+180 },  { duration:.75, ease: [0.215, 0.610, 0.355, 1.000] }])
           
        })
        animate(seq)

    },)
})
// ================== FORM STUFF ==========================//
// get the form elements defined in your form HTML above
var form = document.getElementById("my-form");
var button = document.getElementById("my-form-button");
var formStatus = document.getElementById("my-form-status");

function onRepSuccess() {
    button.removeAttribute("disabled");
}

function resetForm(e) {
    form.style.display = "block";
    formStatus.style.display = "none";
}

window.addEventListener("DOMContentLoaded", function () {
    function success() {
        form.reset();
        form.style.display = "none";
        formStatus.style.display = "block";
        formStatus.style.color = "#84d662";
        formStatus.innerHTML = 'Thanks! <button onClick="resetForm()" class="btn btn-primary float-right">Submit again?</button>';
    }

    function error() {
        formStatus.style.display = "block";
        formStatus.style.color = "#fe3f3f";
        formStatus.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event
    form.addEventListener("submit", function (ev) {
        formStatus.innerHTML = "";
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}

// Function that loads recaptcha on form input focus
function reCaptchaOnFocus() {
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.type = 'text/javascript';
    script.src = 'https://www.google.com/recaptcha/api.js'
    head.appendChild(script);

    // remove focus to avoid js error:
    document.getElementById('name').removeEventListener('focus', reCaptchaOnFocus)
  };
  // add initial event listener to the form inputs
  document.getElementById('name').addEventListener('focus', reCaptchaOnFocus, false);