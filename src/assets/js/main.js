/**
 * @returns {Object}
 */
function defaultFadeConfig() {
    return {
        easing: 'linear',
        iterations: 1,
        direction: 'normal',
        fill: 'forwards',
        delay: 0,
        endDelay: 0
    }
}
function setMenuSize(){
    let winWidth = getWindowWidth();
    let width = winWidth >= 768 ? 'auto' :'100%';
    let height = winWidth >= 768 ? 'auto' :'calc(100vh - 4rem)';
    return {
        height: height,
        width:width
    }
}
/** 
 * @param {HTMLElement} el
 * @param {number} durationInMs
 * @param {Object} config
 * @returns {Promise}
 */
async function fadeOut(el, durationInMs, config = defaultFadeConfig()) {
    return new Promise((resolve, reject) => {
        let sizes = setMenuSize();

        const animation = el.animate([
            { opacity: '1',height: sizes.height, width:  sizes.width },
            { opacity: '0', offset: 0.5 },
            { opacity: '0',height: '0', width: '0',offset: 1 }
        ], { duration: durationInMs, ...config });
        animation.onfinish = () => {
            el.style.display ='none';
            resolve();
        }
    })
}

/** 
 * @param {HTMLElement} el
 * @param {number} durationInMs
 * @param {Object} config
 * @returns {Promise}
 */
async function fadeIn(el, durationInMs, config = defaultFadeConfig()) {
    return new Promise((resolve) => {
        el.style.display ='block';
        let sizes = setMenuSize();
        const animation = el.animate([
            { opacity: '0',height:0 ,width: '0',},
            { opacity: '0.5', offset: 0.5 },
            { opacity: '1',height: sizes.height, width:  sizes.width,offset: 1 }
        ], { duration: durationInMs, ...config });
        animation.onfinish = () => resolve();
    });
}

const mainMenu = document.getElementsByClassName("hamburger-menu")[0];
mainMenu.classList.toggle("animate");


const navLinks = document.getElementsByClassName("nav-links")[0];
const mainMenuInner = document.getElementsByClassName("hamburger-inner")[0];
function getWindowWidth(){
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

}
async function resetNavLinks(){
        if (getWindowWidth() >= 768) {
            await fadeIn(navLinks, 350)
        } else {
            await fadeOut(navLinks, 350)
        }
        return 'done';
}

mainMenu.addEventListener('click', async function(event) {
    event.stopPropagation();
    mainMenuInner.classList.toggle("animate");
    if (mainMenuInner.classList.contains('animate')) {
        await fadeIn(navLinks, 350)
    } else {
        await fadeOut(navLinks, 350)
    }
});
var doit;
window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resetNavLinks, 100);
};