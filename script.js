document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navWrapper = document.querySelector(".nav-wrapper");
    const mobileIcon = document.querySelector(".mobile-toggle i");

    mobileToggle.addEventListener("click", () => {
        navWrapper.classList.toggle("active");
        
        // Toggle Hamburger/Cross Icon
        if (navWrapper.classList.contains("active")) {
            mobileIcon.classList.remove("fa-bars");
            mobileIcon.classList.add("fa-times");
        } else {
            mobileIcon.classList.remove("fa-times");
            mobileIcon.classList.add("fa-bars");
        }
    });

    // Close mobile menu when a navigation link is clicked
    const navLinks = document.querySelectorAll(".nav-link, .header-cta");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navWrapper.classList.remove("active");
            mobileIcon.classList.remove("fa-times");
            mobileIcon.classList.add("fa-bars");
        });
    });


    // --- 2. Smooth Scrolling for Internal Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if(targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjusting scroll offset for sticky header
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- 3. Scroll Reveal Animations via Intersection Observer ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: Unobserve to keep it visible once loaded
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


    // --- 4. Handle Contact Form Submission ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Dummy logic for human-designed feel UI response
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.8";

            // Simulating API Call latency
            setTimeout(() => {
                alert("Thank you for reaching out to Agrawal Smart Classes. Our team will contact you shortly!");
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = "1";
            }, 1500);
        });
    }

});