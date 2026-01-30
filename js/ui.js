document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".page-content");
    const toggle = document.getElementById("themeToggle");

    document.addEventListener("DOMContentLoaded", () => {
        const links = document.querySelectorAll("a[href]");

        links.forEach(link => {
            const href = link.getAttribute("href");

            if (!href || href.startsWith("#") || href.startsWith("http")) return;

            link.addEventListener("click", e => {
                e.preventDefault();

                const direction =
                    link.classList.contains("nav-back") ? "left" : "right";

                document.body.classList.add(
                    direction === "right" ? "slide-out-left" : "slide-out-right"
                );

                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    });

    // --- SAFETY CHECK ---
    if (!page || !toggle) {
        console.warn("Theme toggle or page-content missing");
        return;
    }

    // Restore theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.setAttribute("data-theme", "light");
        toggle.textContent = "🌙";
    }

    // Fade in
    page.classList.add("fade-enter");
    requestAnimationFrame(() => {
        page.classList.add("fade-enter-active");
    });

    // Toggle theme
    toggle.addEventListener("click", () => {
        const isLight = document.body.getAttribute("data-theme") === "light";

        if (isLight) {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
            toggle.textContent = "☀️";
        } else {
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            toggle.textContent = "🌙";
        }
    });

    // Active tab highlight
    const currentPage = location.pathname.split("/").pop();
    document.querySelectorAll(".nav-item").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (href === "index.html" && currentPage === "")) {
            link.classList.add("active");
        }
    });

    // Page transitions
    document.querySelectorAll(".nav-item").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const href = link.getAttribute("href");

            page.classList.remove("fade-enter-active");
            page.classList.add("fade-exit-active");

            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });
    });
});
