const isDev = process.env.ELEVENTY_ENV !== 'production';
const routes = {
  'development' : "http://localhost:8080",
  "staging":"",
  "production": "https://denisenadal.com"
}
const baseUrl = routes[process.env.ELEVENTY_ENV]


module.exports =  {
    title: "Denise Nadal",
    subtitle: "Product & Design",
    author: "Denise Nadal",
    lang: "en-us",
    metaImage: "images/unicorn-06.jpg",
    bioImage: "images/denise.webp",
    colors:  ["magenta","lemon","seafoam","cyan","violet"],
    desc: "Denise Nadal's Product & Web Portfolio",
    keywords: "UI/UX Design, Web Design, Front-End Development, Front-End Engineering,Design Portfolio, Development Portfolio, Engineering Portfolio, Design Wizard, Design Unicorn",
    baseURL: baseUrl,
    isDev: isDev,
    GTM_ID: process.env.GTM_ID,
    FORMSPREE_ID:  process.env.FORMSPREE_ID,
    FORMSPREE_RECAPTCHA: process.env.FORMSPREE_RECAPTCHA
}