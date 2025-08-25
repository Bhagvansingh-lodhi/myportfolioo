// Wait for DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Sticky navbar
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Menu toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Typing animation elements
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    // Progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Project filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    // Check if elements exist before adding event listeners
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Scroll events
    window.addEventListener('scroll', function() {
        // Sticky navbar
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
        
        // Animate progress bars when in viewport
        animateProgressBars();
        
        // Fade in elements on scroll
        fadeInOnScroll();
    });
    
    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typing animation
    if (typedText && cursor) {
        const textArray = ['Software Engineer', 'Web Developer', 'Problem Solver'];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 1500;
        let textArrayIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
                typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursor.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
                typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursor.classList.remove('typing');
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1000);
            }
        }
        
        // Start typing animation
        if (textArray.length) setTimeout(type, newTextDelay + 250);
    }
    
    // Project filtering
    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission code)
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Animate progress bars when they come into view
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }
    
    // Fade in elements on scroll
    function fadeInOnScroll() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('appear');
            }
        });
    }
    
    // Initialize functions on load
    animateProgressBars();
    fadeInOnScroll();
});