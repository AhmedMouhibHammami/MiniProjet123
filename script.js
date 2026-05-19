document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const mainScene = document.getElementById("mainScene");
    const startButton = document.getElementById("startGameBtn");
    const gameMenu = document.getElementById("gameMenu");
    const navLinks = document.querySelectorAll(".top-menu__link");
    const contactForm = document.querySelector(".contact-form");
    const shouldSkipIntro = new URLSearchParams(window.location.search).get("skipIntro") === "1";

    const showMainMenu = () => {
        if (loader) {
            loader.classList.add("loader--hidden");
        }

        if (mainScene) {
            mainScene.classList.remove("scene--hidden");
        }

        if (startButton) {
            startButton.classList.add("start-btn--hidden");
            startButton.setAttribute("aria-hidden", "true");
        }

        if (gameMenu) {
            gameMenu.classList.add("is-visible");
        }
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            if (link.classList.contains("is-active")) {
                e.preventDefault();
            }
        });
    });

    if (shouldSkipIntro) {
        showMainMenu();
    } else {
        setTimeout(() => {
            if (loader) {
                loader.classList.add("loader--hidden");
            }

            if (mainScene) {
                mainScene.classList.remove("scene--hidden");
            }

            if (startButton) {
                requestAnimationFrame(() => {
                    startButton.classList.add("is-visible");
                });
            }
        }, 3000);
    }

    if (startButton) {
        startButton.addEventListener("click", () => {
            if (startButton.classList.contains("is-started")) {
                return;
            }

            startButton.classList.add("is-started");
            startButton.innerHTML = '<span class="start-btn__text">Starting game...</span>';

            setTimeout(() => {
                startButton.classList.add("start-btn--hidden");
                if (gameMenu) {
                    gameMenu.classList.add("is-visible");
                }
            }, 900);
        });
    }

    if (contactForm) {
        const submitButton = contactForm.querySelector(".submit-btn");
        let statusBox = contactForm.querySelector(".form-status");

        if (!statusBox) {
            statusBox = document.createElement("p");
            statusBox.className = "form-status";
            statusBox.setAttribute("aria-live", "polite");
            contactForm.appendChild(statusBox);
        }

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!submitButton) {
                return;
            }

            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = "Skickar...";
            statusBox.textContent = "";
            statusBox.classList.remove("is-visible", "is-success");

            setTimeout(() => {
                statusBox.textContent = "Skickat";
                statusBox.classList.add("is-visible", "is-success");
                submitButton.textContent = "Skickat";
                contactForm.reset();

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 1800);
            }, 700);
        });
    }

    // Handle ingredient checkboxes
    const ingredientCheckboxes = document.querySelectorAll(".ingredients-list input[type='checkbox']");
    
    ingredientCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const span = checkbox.nextElementSibling;
            if (span && span.tagName === "SPAN") {
                if (checkbox.checked) {
                    span.style.textDecoration = "line-through";
                    span.style.color = "rgba(247, 240, 224, 0.5)";
                } else {
                    span.style.textDecoration = "none";
                    span.style.color = "rgba(247, 240, 224, 0.9)";
                }
            }
        });
    });

    const retroOptions = document.querySelectorAll(".retro-option");
    
    retroOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
            const category = option.getAttribute("data-category");
            handleMarketSelection(category);
        });

        option.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const category = option.getAttribute("data-category");
                handleMarketSelection(category);
            }
        });
    });

    function handleMarketSelection(category) {
        console.log(`Selected market category: ${category}`);
    }
});

