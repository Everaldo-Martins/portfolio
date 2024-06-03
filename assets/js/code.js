document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener("scroll", function() {  
        let sticky = document.querySelector('.navbar'),
        scroll_up = document.querySelector('.scroll-up');      
        this.scrollY > 20 ? sticky.classList.add("sticky") : sticky.classList.remove("sticky"); 
        this.scrollY > 500 ? scroll_up.classList.add("show") : scroll_up.classList.remove("show");

        scroll_up.onclick = () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    });        

    document.querySelector('.menu-btn').onclick = () => {
        let menu = document.querySelector('.menu');
        menu.classList.contains("active") ? menu.classList.remove("active") : menu.classList.add("active");
    }

    var texts = ["Estudante", "Web Designer", "Desenvolvedor", "TI"],
        speed = 200,
        currentIndex = 0,
        charIndex = 0,
        typing = document.querySelector(".typing"),
        typing2 = document.querySelector(".typing-2");
    typeWriter();

    function typeWriter() {
        charIndex < texts[currentIndex].length ?
            (typing.textContent = typing2.textContent += texts[currentIndex][charIndex++], setTimeout(typeWriter, speed)) :
            setTimeout(eraseWriter, speed + 1000);
    }
    
    function eraseWriter() {
        charIndex > 0 ?
            (typing.textContent = typing2.textContent = typing2.textContent.slice(0, -1), charIndex--, setTimeout(eraseWriter, speed / 2)) :
            (currentIndex = (currentIndex + 1) % texts.length, setTimeout(typeWriter, speed));
    }

    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];    

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");        
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if(!isDragging) return;        
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
       
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
    autoPlay();

    document.querySelector('.copy').innerHTML = 'EDM - Dev Everaldo Martins <span class="far fa-copyright"></span> ' + new Date().getFullYear() + ' - Todos os direitos reservados.';
});

var form = document.querySelector("form");  
async function handleSubmit(event) {
event.preventDefault();
var status = document.querySelector(".my-form-status");
var data = new FormData(event.target);
fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        status.innerHTML = "<p class=\"sucess\">Mensagem enviada! Obrigado por entrar em contato.</p>";
        form.reset();
    } 
    else {
        response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
            status.innerHTML = "<p class=\"erro\">Oops! Ocorreu um problema ao enviar seu formulário.</p>";
            }
        })
    }
}).catch(error => {
    status.innerHTML = "<p class=\"erro\">Oops! Ocorreu um problema ao enviar seu formulário.</p>";
});
}
form.addEventListener("submit", handleSubmit);
