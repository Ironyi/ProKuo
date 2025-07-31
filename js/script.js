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

// Mobile hamburger menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('click', function(event) {
    if (event.target.matches('.nav-link')) {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
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

// ===== Project Gallery Slider Script =====
let currentSlideIndex = [1, 1, 1]; // Track current slide for each project

function changeSlide(direction, projectNum) {
    const slider = document.querySelector(`[data-project="${projectNum}"]`);
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.parentElement.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlideIndex[projectNum - 1] - 1].classList.remove('active');
    indicators[currentSlideIndex[projectNum - 1] - 1].classList.remove('active');
    
    // Update slide index
    currentSlideIndex[projectNum - 1] += direction;
    
    // Loop around if necessary
    if (currentSlideIndex[projectNum - 1] > slides.length) {
        currentSlideIndex[projectNum - 1] = 1;
    }
    if (currentSlideIndex[projectNum - 1] < 1) {
        currentSlideIndex[projectNum - 1] = slides.length;
    }
    
    // Add active class to new slide and indicator
    slides[currentSlideIndex[projectNum - 1] - 1].classList.add('active');
    indicators[currentSlideIndex[projectNum - 1] - 1].classList.add('active');
}

function currentSlide(slideNum, projectNum) {
    const slider = document.querySelector(`[data-project="${projectNum}"]`);
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.parentElement.querySelectorAll('.indicator');
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Set current slide index
    currentSlideIndex[projectNum - 1] = slideNum;
    
    // Add active class to selected slide and indicator
    slides[slideNum - 1].classList.add('active');
    indicators[slideNum - 1].classList.add('active');
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        // Go to previous slide for all projects
        for (let i = 1; i <= 3; i++) {
            changeSlide(-1, i);
        }
    } else if (event.key === 'ArrowRight') {
        // Go to next slide for all projects
        for (let i = 1; i <= 3; i++) {
            changeSlide(1, i);
        }
    }
});

// Modal functionality
let currentModalSlideIndex = [1, 1, 1]; // Track current slide for each modal

function openModal(projectNum) {
    const modal = document.getElementById(`project-modal-${projectNum}`);
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    
    // Reset to first slide when opening modal
    currentModalSlideIndex[projectNum - 1] = 1;
    showModalSlide(projectNum, 1);
}

function closeModal(projectNum) {
    const modal = document.getElementById(`project-modal-${projectNum}`);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

function changeModalSlide(direction, projectNum) {
    const slides = document.querySelectorAll(`#project-modal-${projectNum} .modal-slide`);
    const totalSlides = slides.length;
    
    // Update slide index
    currentModalSlideIndex[projectNum - 1] += direction;
    
    // Wrap around if necessary
    if (currentModalSlideIndex[projectNum - 1] > totalSlides) {
        currentModalSlideIndex[projectNum - 1] = 1;
    } else if (currentModalSlideIndex[projectNum - 1] < 1) {
        currentModalSlideIndex[projectNum - 1] = totalSlides;
    }
    
    showModalSlide(projectNum, currentModalSlideIndex[projectNum - 1]);
}

function currentModalSlide(slideNum, projectNum) {
    showModalSlide(projectNum, slideNum);
}

function showModalSlide(projectNum, slideNum) {
    const slides = document.querySelectorAll(`#project-modal-${projectNum} .modal-slide`);
    const indicators = document.querySelectorAll(`#project-modal-${projectNum} .modal-indicator`);
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Set current slide index
    currentModalSlideIndex[projectNum - 1] = slideNum;
    
    // Add active class to selected slide and indicator
    slides[slideNum - 1].classList.add('active');
    indicators[slideNum - 1].classList.add('active');
}

// Close modal when clicking outside of modal content
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.project-modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
});

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.project-modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    }
});
