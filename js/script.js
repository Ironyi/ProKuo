window.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

            const path = window.location.pathname.split("/").pop();
            const navLinks = document.querySelectorAll(".nav-link");
            navLinks.forEach(link => {
                if (link.getAttribute("data-page") === path) {
                    link.classList.add("active");
                }
            });

            // Wait until .navbar is injected, then activate scroll behavior
            const navbar = document.querySelector(".navbar");
            if (navbar) {
                setupNavbarScrollBehavior(navbar);
            }
        });

    fetch("footer.html")
        .then(res => res.text())
        .then(data => document.getElementById("footer").innerHTML = data);
});

function setupNavbarScrollBehavior(navbar) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Darken navbar when scrolled
        if (currentScroll > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Show/hide navbar on scroll direction
        if (currentScroll > lastScrollTop) {
            navbar.style.top = "-80px"; // Hide
        } else {
            navbar.style.top = "0"; // Show
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// ===== Testimonial Carousel Script =====
window.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    if (slides.length > 0) {
        let slideIndex = 0;

        function showNextSlide() {
            slides[slideIndex].classList.remove("active");
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add("active");
        }

        setInterval(showNextSlide, 5000); // every 5 seconds
    }
});
