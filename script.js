// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navbar Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const currentPage = window.location.pathname;
        const targetPage = targetId.includes('.html') ? targetId : null;

        if (targetPage) {
            window.location.href = targetPage;
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Carousel Functionality
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

if (carouselSlides && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);

    firstSlideClone.classList.add('carousel-slide');
    lastSlideClone.classList.add('carousel-slide');
    firstSlideClone.style.width = '100%';
    firstSlideClone.style.height = '100%';
    lastSlideClone.style.width = '100%';
    lastSlideClone.style.height = '100%';

    carouselSlides.appendChild(firstSlideClone);
    carouselSlides.insertBefore(lastSlideClone, slides[0]);

    carouselSlides.style.transform = `translateX(-${100}%)`;

    function updateCarousel(transition = true) {
        if (transition) {
            carouselSlides.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        } else {
            carouselSlides.style.transition = 'none';
        }
        carouselSlides.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;

        let dotIndex = currentSlide % totalSlides;
        if (dotIndex < 0) dotIndex += totalSlides;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[dotIndex].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        updateCarousel();
        if (currentSlide === totalSlides) {
            setTimeout(() => {
                currentSlide = 0;
                updateCarousel(false);
            }, 800);
        }
    }

    function prevSlide() {
        currentSlide--;
        updateCarousel();
        if (currentSlide === -1) {
            setTimeout(() => {
                currentSlide = totalSlides - 1;
                updateCarousel(false);
            }, 800);
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    setInterval(nextSlide, 5000);
    updateCarousel(false);
}

// IntersectionObserver for section and brochure animations
const elementsToAnimate = document.querySelectorAll('[data-animate]');
const posts = document.querySelectorAll('#curator-feed-default-feed-layout .crt-post');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('section')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('brochure-img')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.id === 'instafeed') {
                posts.forEach(post => {
                    post.classList.add('animate');
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

elementsToAnimate.forEach(element => {
    observer.observe(element);
});