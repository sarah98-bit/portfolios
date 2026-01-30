/**
 * Sarah Wairimu Thuo - Capstone Portfolio Logic
 * Handles Smooth Scrolling, Scroll-Reveal Animations, and Active Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sarah Thuo's Capstone Portfolio: System Online.");

    // 1. SMOOTH SCROLLING FOR NAV LINKS
    // Ensures clicking "Innovation" or "Biography" slides smoothly to the section
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only perform smooth scroll for internal links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 2. SCROLL REVEAL ANIMATION (Intersection Observer)
    // Makes cards "fade in" and "slide up" as the marker scrolls down
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stop observing once revealed to boost performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply the observer to all card sections
    const sections = document.querySelectorAll('.card-section');
    sections.forEach(section => {
        // Initial state set via JS to ensure site is readable if JS is disabled
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease-out";
        revealOnScroll.observe(section);
    });

    // 3. NAVIGATION HIGHLIGHTING
    // Highlights the current section in the top menu as you scroll
    window.addEventListener('scroll', () => {
        let current = "";
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== "") {
                link.classList.add('active');
            }
        });
    });
});

/**
 * HELPER: Add this class to your CSS if not already present
 * .revealed { opacity: 1 !important; transform: translateY(0) !important; }
 */