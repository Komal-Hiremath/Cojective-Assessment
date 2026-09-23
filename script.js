document.addEventListener("DOMContentLoaded", function () {
    /* ================= HEADER ================= */

    const header = document.querySelector(".header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });

    /* ================= ACTIVE NAVIGATION ================= */

    const navLinks = document.querySelectorAll(".nav_link");
    const sections = document.querySelectorAll("main section[id]");
    function updateActiveLink() {
        let currentSection = "";
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove("is-active");
            const href = link.getAttribute("href");
            if (href === "#" + currentSection) {
                link.classList.add("is-active");
            }
        });
    }
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    /* ================= SMOOTH LINKS ================= */

    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            if (targetId === "#") {
                event.preventDefault();
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* ================= WHY CARD REVEAL ================= */

    const revealElements = document.querySelectorAll(".why__card");
    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );
    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

    /* ================= ABOUT CARET ================= */

    const aboutLink = document.querySelector(
        '.nav_link[href="#about"]'
    );
    const caret = document.querySelector(".caret");
    if (aboutLink && caret) {
        aboutLink.addEventListener("mouseenter", function () {
            caret.style.transform = "rotate(90deg)";
        });
        aboutLink.addEventListener("mouseleave", function () {
            caret.style.transform = "rotate(0deg)";
        });
    }

    /* ================= HERO VIDEO ================= */

    const heroVideo = document.querySelector(".hero__media");
    if (heroVideo) {
        heroVideo.addEventListener("error", function () {
            heroVideo.style.display = "none";
        });
        heroVideo.play().catch(function () {
            console.log("Hero video autoplay was prevented.");
        });
    }

    /* ================= BUTTON CLICK EFFECT ================= */

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.add("clicked");
            setTimeout(function () {
                button.classList.remove("clicked");
            }, 200);
        });
    });

    /* ================= COPYRIGHT YEAR ================= */

    const yearElement = document.querySelector(".bottom span");
    if (yearElement) {
        yearElement.textContent =
            "© " +
            new Date().getFullYear() +
            " TEKNIC EUCHNER";
    }

    /* ================= WEBSITE LINK ================= */

    const websiteLink = document.querySelector(
        '.contact a[href^="https://"]'
    )
    if (websiteLink) {
        websiteLink.addEventListener("click", function () {
            console.log("Opening Teknic Euchner website");
        });
    }
});