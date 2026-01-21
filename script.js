// DOM Elements
const navbar = document.querySelector('#navbar');
const mobileToggle = document.querySelector('#mobile-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const typingText = document.querySelector('#typing-text');
const heroSection = document.querySelector('.hero-section');

// --- Navigation Scroll Effect ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    // Simple parallax/fade for hero
    const scrolled = window.scrollY;
    if (heroSection && scrolled < 600) {
        heroSection.style.opacity = 1 - scrolled / 800;
        heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// --- Mobile Menu Toggle ---
mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // Optional: Animate icon or change icon logic here if needed
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// --- Smooth Scroll for Anchor Links (Optional enhanced) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- Typing Effect ---
const words = ['Web Applications', 'Digital Experiences', 'Creative Solutions'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseSpeed = 2000;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
        typeDelay = pauseSpeed;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeDelay = 500;
    }

    setTimeout(type, typeDelay);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    type();
});

// --- Intersection Observer for Scroll Animations (Fade Up) ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add scroll-animation class to elements you want to animate
// (You would add .scroll-hidden to CSS and toggle .scroll-visible here)
// For this MVP, we kept it simple, but this is setup for future expansion.
