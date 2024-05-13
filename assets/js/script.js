const link = document.querySelector("link"),
    menu = document.querySelectorAll("nav ul li"),
    content = document.querySelectorAll("main section");

//Dark Mode
//window.matchMedia(`(prefers-color-scheme: dark)`).matches ? link.href = "./css/style_dark.css" : link.href = "./css/style.css";

//Menu Active
menu.forEach((m, i) => {
    m.onclick = () => { 
        menu.forEach((c) => {c.removeAttribute("class", "active")});
        m.setAttribute("class", "active");
        content.forEach((c, i) => {c.removeAttribute("class", "active")});
        content[i].setAttribute("class", "active");
    }
});