document.addEventListener("DOMContentLoaded", () => {
    // Activar inmediatamente la animación del hero
    const heroElements = document.querySelectorAll('.hero__title, .hero__subtitle');
    heroElements.forEach(element => {
        element.classList.add('animate');
    });

    const testimonials = [
        { text: "\"Lorem ipsum dolor sit amet...\"", author: "- John Doe" },
        { text: "\"Consectetur adipiscing elit...\"", author: "- Jane Smith" },
        { text: "\"Sed do eiusmod tempor incididunt...\"", author: "- Alice Brown" }
    ];
    let index = 0;

    function changeTestimonial() {
        const textElement = document.getElementById("testimonial-text");
        const authorElement = document.getElementById("testimonial-author");

        textElement.style.transition = "transform 0.5s ease-in-out, opacity 0.5s";
        authorElement.style.transition = "transform 0.5s ease-in-out, opacity 0.5s";
        textElement.style.transform = "translateX(-50%)";
        authorElement.style.transform = "translateX(-50%)";
        textElement.style.opacity = "0";
        authorElement.style.opacity = "0";

        setTimeout(() => {
            index = (index + 1) % testimonials.length;
            textElement.innerHTML = testimonials[index].text;
            authorElement.innerHTML = testimonials[index].author;
            textElement.style.transition = "none";
            authorElement.style.transition = "none";
            textElement.style.transform = "translateX(50%)";
            authorElement.style.transform = "translateX(50%)";

            setTimeout(() => {
                textElement.style.transition = "transform 0.5s ease-in-out, opacity 0.5s";
                authorElement.style.transition = "transform 0.5s ease-in-out, opacity 0.5s";
                textElement.style.transform = "translateX(0)";
                authorElement.style.transform = "translateX(0)";
                textElement.style.opacity = "1";
                authorElement.style.opacity = "1";
            }, 50);
        }, 500);
    }

    setInterval(changeTestimonial, 5000);

    // Observar solo los elementos que necesitan animación al scroll
    const scrollElements = document.querySelectorAll('.services__item, .team__member');
    console.log('Elementos encontrados:', scrollElements.length); // Debug

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            //console.log('Elemento intersectando:', entry.target.className, entry.isIntersecting); // Debug
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.4,
        rootMargin: '100px' 
    });

    scrollElements.forEach(element => {
        observer.observe(element);
        //console.log('Observando elemento:', element.className); // Debug
    });

    // Funcionalidad del menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const headerNav = document.querySelector('.header__nav');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            headerNav.style.height = mobileMenu.classList.contains('open') ? 'auto' : '0';
        });
        
        const menuLinks = document.querySelectorAll('.header__link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }
});