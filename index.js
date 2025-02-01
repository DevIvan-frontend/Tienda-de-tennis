const raquetaScroll = document.querySelector('.raqueta-scroll');
const slides = document.querySelectorAll('.imagen-producto');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.boton-izq button');
const nextButton = document.querySelector('.boton-derecha button');
let currentSlide = 0;
let autoSlideInterval;
let scrollDirection = 1;
let isDragging = false;
let startX = 0;
let scrollStart = 0;
let scrollInterval = setInterval(autoScroll, 20);

function autoScroll() {
    raquetaScroll.scrollBy({ left: scrollDirection, behavior: 'smooth' });
    if (raquetaScroll.scrollLeft + raquetaScroll.clientWidth >= raquetaScroll.scrollWidth) {
        scrollDirection = -2; 
    }
    if (raquetaScroll.scrollLeft <= 0) {
        scrollDirection = 2;
    }
}

raquetaScroll.addEventListener('mousedown', (e) => {
    isDragging = true;
    raquetaScroll.classList.add('active');
    startX = e.pageX;
    scrollStart = raquetaScroll.scrollLeft;
    clearInterval(scrollInterval); 
});

raquetaScroll.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const distance = e.pageX - startX;
    raquetaScroll.scrollLeft = scrollStart - distance;
});

raquetaScroll.addEventListener('mouseup', () => {
    isDragging = false;
    scrollInterval = setInterval(autoScroll, 20); 
});

raquetaScroll.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollInterval = setInterval(autoScroll, 20); 
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".head-pestañas");
    const navLinks = document.querySelectorAll(".head-pestañas ul li a");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
        });
    });

    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });
});



function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        currentSlide = index;
        showSlide(currentSlide);
        startAutoSlide();
    });
});

startAutoSlide();
showSlide(currentSlide);