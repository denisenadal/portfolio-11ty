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
    colors:  ["pink","red","orange","yellow","green","blue","purple"],
    metaDesc: "Denise Nadal's Product & Web Portfolio",
    keywords: "UI/UX Design, Web Design, Front-End Development, Front-End Engineering,Design Portfolio, Development Portfolio, Engineering Portfolio, Design Wizard, Design Unicorn",
    baseURL: baseUrl,
    isDev: isDev

}