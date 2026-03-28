document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navWrapper = document.querySelector(".nav-wrapper");
    const mobileIcon = document.querySelector(".mobile-toggle i");

    mobileToggle.addEventListener("click", () => {
        navWrapper.classList.toggle("active");
        if (navWrapper.classList.contains("active")) {
            mobileIcon.classList.replace("fa-bars", "fa-times");
        } else {
            mobileIcon.classList.replace("fa-times", "fa-bars");
        }
    });

    const navLinks = document.querySelectorAll(".nav-link, .header-cta");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navWrapper.classList.remove("active");
            mobileIcon.classList.replace("fa-times", "fa-bars");
        });
    });


    // --- 2. Smooth Scrolling for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if(targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle dynamic delay for stagger effect
                const delay = entry.target.getAttribute("data-delay");
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 4. Parallax Effect for Hero 3D Elements ---
    const heroSection = document.querySelector('.hero');
    const parallaxItems = document.querySelectorAll('.parallax-wrapper');

    if (heroSection && parallaxItems.length > 0) {
        document.addEventListener('mousemove', (e) => {
            // Only calculate if hero is somewhat in view
            if (window.scrollY > window.innerHeight) return;
            
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            parallaxItems.forEach(item => {
                const speed = item.getAttribute('data-speed');
                item.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
            });
        });
    }


    // --- 5. Vanilla 3D Tilt Effect for Course Cards ---
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limit the tilt angle
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        });

        card.addEventListener('mouseenter', () => {
            // Remove transition on hover so mouse movement is instant
            card.style.transition = 'none';
        });
    });


    // --- 6. Animated Number Counters for Results ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                // Determine speed dynamically based on target size
                const speed = target / 60; 

                const updateCount = () => {
                    count += speed;
                    if(count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                
                // Add a small delay so user sees the scroll animation first
                setTimeout(updateCount, 400); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));


    // --- 7. Contact Form Submission (Mock API) ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.style.pointerEvents = "none";
            submitBtn.style.opacity = "0.8";

            setTimeout(() => {
                alert("Thank you! Your application has been submitted successfully. Agarwal Smart Classes will contact you soon.");
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.pointerEvents = "all";
                submitBtn.style.opacity = "1";
            }, 2000);
        });
    }
});