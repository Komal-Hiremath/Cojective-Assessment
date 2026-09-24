document.addEventListener("DOMContentLoaded", function () {
    /* ================= HEADER ================= */

    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(15, 15, 15, 0.97)";
        } else {
            navbar.style.background = "rgba(21, 27, 32, 1)";
        }
    });

    /* ================= NAVIGATION ================= */

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    /* ================= CONTACT BUTTON ================= */

    const contactButton = document.querySelector(".contact-btn");
    if (contactButton) {
        contactButton.addEventListener("click", function (event) {
            event.preventDefault();
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: "smooth"
                });
            } else {
                const footer = document.querySelector(".footer");
                if (footer) {
                    footer.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    }

    /* ================= HERO VIDEO ================= */
    const heroVideo = document.querySelector(".hero__media");
    if (heroVideo) {
        heroVideo.muted = true;
        const playVideo = function () {
            const promise = heroVideo.play();
            if (promise !== undefined) {
                promise.catch(function () {
                    // Browser blocked autoplay.
                });
            }
        };
        playVideo();
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                playVideo();
            }
        });
    }

    /* ================= GERMAN SECTION SLIDESHOW ================= */

    const slides = document.querySelectorAll("#german .slideshow .slide");
    let currentSlide = 0;
    let slideTimer;
    function showSlide(index) {
        slides.forEach(function (slide, i) {
            slide.classList.remove("active");
            slide.style.opacity = "0";
            slide.style.zIndex = "0";
            if (i === index) {
                slide.classList.add("active");
                slide.style.opacity = "1";
                slide.style.zIndex = "1";
            }
        });
    }
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    function startSlideshow() {
        clearInterval(slideTimer);
        slideTimer = setInterval(function () {
            nextSlide();
        }, 3000);
    }
    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();
    }

    /* ================= PAUSE SLIDESHOW WHEN TAB IS HIDDEN ================= */

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            clearInterval(slideTimer);
        } else {
            startSlideshow();
        }
    });

    /* ================= RED BUTTON CLICK EFFECT ================= */

    const buttons = document.querySelectorAll(".btn, .expert-btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.add("clicked");
            setTimeout(function () {
                button.classList.remove("clicked");
            }, 150);
        });
    });

    /* ================= EXPERT BUTTON ================= */

    const expertButtons = document.querySelectorAll(".expert-btn");
    expertButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const contact = document.querySelector(".footer");
            if (contact) {
                contact.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );
        revealElements.forEach(function (element) {
            element.style.opacity = "0";
            element.style.transform = "translateY(30px)";
            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        });
    }

    /* ================= PRODUCT CARDS ================= */

    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-6px)";
            card.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.12)";
        });
        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "none";
        });
    });

    /* ================= WHY CARDS ================= */

    const whyCards = document.querySelectorAll(".why__card");
    whyCards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-5px)";
            card.style.transition = "transform 0.25s ease";
        });
        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });
    });

    /* ================= INDUSTRY ITEMS ================= */

    const industryItems = document.querySelectorAll(".item");
    industryItems.forEach(function (item) {
        item.addEventListener("mouseenter", function () {
            item.style.backgroundColor = "#f5f5f5";
            item.style.transition = "background-color 0.25s ease";
        });
        item.addEventListener("mouseleave", function () {
            item.style.backgroundColor = "transparent";
        });
    });

    /* ================= IMAGE LAZY LOADING ================= */

    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    lazyImages.forEach(function (image) {
        image.addEventListener("load", function () {
            image.style.opacity = "1";
        });
        image.style.opacity = "0";
        image.style.transition = "opacity 0.4s ease";
    });

    /* ================= FOOTER YEAR ================= */
    const bottomText = document.querySelector(".bottom span");
    if (bottomText) {
        bottomText.textContent =
            "© " + new Date().getFullYear() + " TEKNIC EUCHNER";
    }

    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach(function (link) {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === "#" + id) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.4
        }
    );
    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
});