document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector('.hero');
    const offset = -100; // Mismo offset para ambos

    function applyParallax() {
        hero.style.backgroundSize = window.innerWidth > 768 ? 'cover' : 'auto 130%';
        hero.style.backgroundPosition = `center ${offset}px`;
    }

    // Initial application
    applyParallax();

    // Apply on scroll for all devices
    window.addEventListener('scroll', function () {
        let scrollPosition = window.scrollY;
        // Usar el mismo cálculo para desktop y mobile
        hero.style.backgroundPosition = `center ${offset + scrollPosition * 0.5}px`;
    });

    // Reapply on resize
    window.addEventListener('resize', applyParallax);
});


document.addEventListener("DOMContentLoaded", () => {
    // Immediately activate hero animation
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

    // Observe only elements that need scroll animation
    const scrollElements = document.querySelectorAll('.services__item, .team__member');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            //console.log('Element intersecting:', entry.target.className, entry.isIntersecting); // Debug
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
        //console.log('Observing element:', element.className); // Debug
    });

    // Mobile menu functionality
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

function easeOutQuad(t) {
    return t * (2 - t); // Makes the animation decelerate at the end
}

function animateCounter(element, target) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress); // Apply easing
        let currentValue = Math.floor(easedProgress * target);

        if (element.getAttribute('data-target') === "70") {
            element.textContent = progress < 1 ? currentValue : `+${target}`; // Add the "+"
        } else {
            element.textContent = currentValue;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.getAttribute('data-target') === "70" ? `+${target}` : target;
        }
    }

    requestAnimationFrame(updateCounter);
}

function startCounters(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            observer.unobserve(counter); // Prevent animation from repeating
        }
    });
}

const observer = new IntersectionObserver(startCounters, { threshold: 0.5 });

document.querySelectorAll('.stat__number').forEach(counter => {
    observer.observe(counter);
});