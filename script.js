// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navbar Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor jump behavior

        const targetId = this.getAttribute('href'); // Get the href value (e.g., "#home" or "contact.html")
        const currentPage = window.location.pathname; // Get the current page path
        const targetPage = targetId.includes('.html') ? targetId : null; // Check if the link points to another page

        // If the link points to another page (e.g., contact.html)
        if (targetPage) {
            // Navigate to the page
            window.location.href = targetPage;
        } else {
            // If the link points to a section on the current page (e.g., #home)
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate the offset to account for the fixed navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

                // Smooth scroll to the target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Close the hamburger menu on mobile after clicking a link
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

// Check if carousel elements exist (only on index.html)
if (carouselSlides && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length; // 2 slides initially

    // Clone slides to create an infinite loop effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);

    // Ensure cloned slides have the same styles
    firstSlideClone.classList.add('carousel-slide');
    lastSlideClone.classList.add('carousel-slide');
    firstSlideClone.style.width = '100%';
    firstSlideClone.style.height = '100%';
    lastSlideClone.style.width = '100%';
    lastSlideClone.style.height = '100%';

    carouselSlides.appendChild(firstSlideClone); // Add clone of first slide at the end
    carouselSlides.insertBefore(lastSlideClone, slides[0]); // Add clone of last slide at the start

    // Adjust the initial position to account for the cloned slide at the start
    carouselSlides.style.transform = `translateX(-${100}%)`; // Start at the first real slide

    // Function to update the carousel
    function updateCarousel(transition = true) {
        if (transition) {
            carouselSlides.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        } else {
            carouselSlides.style.transition = 'none'; // Disable transition for instant jump
        }
        carouselSlides.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;

        // Update dots
        let dotIndex = currentSlide % totalSlides;
        if (dotIndex < 0) dotIndex += totalSlides; // Handle negative index for prev
        dots.forEach(dot => dot.classList.remove('active'));
        dots[dotIndex].classList.add('active');
    }

    // Next slide (always move forward)
    function nextSlide() {
        currentSlide++;
        updateCarousel();

        // If we reach the cloned first slide (after the last real slide), jump back to the first real slide
        if (currentSlide === totalSlides) {
            setTimeout(() => {
                currentSlide = 0;
                updateCarousel(false); // No transition for the jump
            }, 800); // Match the transition duration
        }
    }

    // Previous slide (move backward, but visually forward)
    function prevSlide() {
        currentSlide--;
        updateCarousel();

        // If we reach the cloned last slide (before the first real slide), jump to the last real slide
        if (currentSlide === -1) {
            setTimeout(() => {
                currentSlide = totalSlides - 1;
                updateCarousel(false); // No transition for the jump
            }, 800); // Match the transition duration
        }
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Automatic sliding every 5 seconds
    setInterval(nextSlide, 5000);

    // Initial update to ensure the dots are correct
    updateCarousel(false);
}

// IntersectionObserver for section and Instagram post animations
const elementsToAnimate = document.querySelectorAll('[data-animate]');
const posts = document.querySelectorAll('#curator-feed-default-feed-layout .crt-post');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the element is a section, animate the section
            if (entry.target.classList.contains('section')) {
                entry.target.classList.add('animate');
            }
            // If the element is the Instagram feed, animate the posts
            if (entry.target.id === 'instafeed') {
                posts.forEach(post => {
                    post.classList.add('animate');
                });
            }
            // Stop observing once the animation has triggered
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Start observing all elements with data-animate
elementsToAnimate.forEach(element => {
    observer.observe(element);
});