document.addEventListener('DOMContentLoaded', function() {

    // --- LUCIDE ICONS INITIALIZATION ---
    // This function finds all elements with `data-lucide` and replaces them with SVG icons
    lucide.createIcons();
    
    // --- CUSTOM ICON HANDLING ---
    // Lucide doesn't include brand icons, so we define them here as SVGs.
    const customIcons = {
        'html5': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3l1.65 18.01L12 23l8.35-1.99L22 3z"/><path d="M12 18V8l-5 2.5"/><path d="m17 10.5-5-2.5"/></svg>`,
        'css3': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3l1.65 18.01L12 23l8.35-1.99L22 3z"/><path d="m17 15.5-5-2.5v-5l5 2.5Z"/><path d="M12 8H7"/></svg>`,
        'javascript': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M10 8c.2-2.8.4-5 2-5 1.4 0 1.6.8 1.6 2.8 0 2.4-.8 4.1-2.6 4.1-1.9 0-2.4-1.5-2.4-3.8"/><path d="M11.2 14.2c0-2.4 1.2-4.2 3-4.2 1.9 0 2.8 1.6 2.8 4.2 0 3.4-1.7 4.8-4 4.8-2.1 0-3.8-1.5-3.8-4.8Z"/></svg>`,
        'react': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>`,
        'tailwind': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c-3.333-5-10-5-10-5S5.333 12 2 17c3.333 5 10 5 10 5s-3.333-5 0-10z"/><path d="M22 12c-3.333-5-10-5-10-5s-3.333 7 0 10c3.333 5 10 5 10 5s-3.333-5 0-10z"/></svg>`,
        'node-js': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 8.5v7h4l3.5-3.5-3.5-3.5z"/><path d="M12 2l-2.4 4.8L4.8 9.2 2 12l2.8 2.8 4.8 2.4 2.4 4.8 2.4-4.8 4.8-2.4 2.8-2.8-2.8-2.8-4.8-2.4z"/></svg>`,
        'figma': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h-2a2 2 0 0 0 -2 2v2a2 2 0 0 0 2 2h2z"/><path d="M12 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2z"/><circle cx="12" cy="12" r="2" /><path d="M8 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M12 8a2 2 0 1 1 0 -4a2 2 0 0 1 0 4z"/></svg>`,
    };
    
    // Replace the `data-lucide` placeholders with our custom SVG content
    document.querySelectorAll('[data-lucide]').forEach(el => {
        const iconName = el.getAttribute('data-lucide');
        if (customIcons[iconName]) {
            el.innerHTML = customIcons[iconName];
            // Ensure the SVG scales correctly within the `<i>` tag
            if (el.firstChild && el.firstChild.tagName === 'svg') {
                el.firstChild.setAttribute('width', '100%');
                el.firstChild.setAttribute('height', '100%');
                el.firstChild.setAttribute('class', el.className);
            }
        }
    });

    // --- NAVIGATION LOGIC ---
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Add a scrolled class to the navbar when user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
    
    // Toggle the mobile menu visibility on button click
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Implement smooth scrolling for all anchor links pointing to an ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
               targetElement.scrollIntoView({
                   behavior: 'smooth'
               });
            }

            // If the mobile menu is open, close it after a link is clicked
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    // Initialize ScrollReveal library for revealing elements on scroll
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '30px',
        duration: 700,
        delay: 200,
        reset: false, // Animations will only run once
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    });

    // Define the reveal animations for different sections and elements
    sr.reveal('.section-heading');
    sr.reveal('#home > div > *', { interval: 100 });
    sr.reveal('#about .grid > *', { origin: 'left', interval: 100, distance: '50px' });
    sr.reveal('.skill-card', { interval: 80 });
    sr.reveal('.project-card', { interval: 80 });
    sr.reveal('#contact > *', { interval: 100, distance: '40px' });
    sr.reveal('footer > *', { interval: 100, distance: '20px' });


    // --- CONTACT FORM VALIDATION ---
    const form = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset previous validation states
        form.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('invalid');
        });
        formSuccessMessage.classList.add('hidden');
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Validate Name: not empty
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            isValid = false;
        }

        // Validate Email: matches a simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            isValid = false;
        }

        // Validate Message: not empty
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('invalid');
            isValid = false;
        }

        // If all fields are valid, show success message and reset the form
        if (isValid) {
            formSuccessMessage.classList.remove('hidden');
            form.reset();
            // Optional: Hide the success message after a few seconds
            setTimeout(() => {
                formSuccessMessage.classList.add('hidden');
            }, 5000);
        }
    });
});

