/* ==========================================================
   APK SOLUÇÕES
   app.js
   Versão 1.1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initHeader();
    initMobileMenu();
    initScrollReveal();
    initBackToTop();
    initSmoothScroll();
    initDashboardAnimation();
    initActiveNavigation();

});


/* ==========================================================
   HEADER
========================================================== */

function initHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

}


/* ==========================================================
   MENU MOBILE
========================================================== */

function initMobileMenu() {

    const menuButton = document.querySelector(".header__mobile");
    const menu = document.querySelector(".header__nav");

    if (!menuButton || !menu) return;


    menuButton.setAttribute("aria-expanded", "false");


    menuButton.addEventListener("click", () => {

        const isActive = menu.classList.toggle("active");

        menuButton.classList.toggle("active", isActive);

        menuButton.setAttribute(
            "aria-expanded",
            isActive ? "true" : "false"
        );

    });


    /* Fechar menu ao clicar em um link */

    const links = menu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Fechar ao clicar fora */

    document.addEventListener("click", (event) => {

        if (

            !menu.contains(event.target) &&
            !menuButton.contains(event.target)

        ) {

            menu.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initScrollReveal() {

    const elements = document.querySelectorAll(`

        .transform__card,
        .solution-card,
        .dashboard,
        .apkone__modules span,
        .cta,
        .section-title

    `);

    if (!elements.length) return;


    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.15
        }

    );


    elements.forEach(element => {

        element.classList.add("fade");

        observer.observe(element);

    });

}


/* ==========================================================
   BOTÃO VOLTAR AO TOPO
========================================================== */

function initBackToTop() {

    const button = document.createElement("button");

    button.className = "to-top";

    button.type = "button";

    button.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );

    button.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(button);


    function updateButton() {

        if (window.scrollY > 500) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    }


    updateButton();


    window.addEventListener("scroll", updateButton, {
        passive: true
    });


    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ==========================================================
   SCROLL SUAVE
========================================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );


    links.forEach(link => {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");


            /*
             * Evita que href="#" mova a página
             */

            if (!href || href === "#") {

                event.preventDefault();

                return;

            }


            const target =
                document.querySelector(href);


            if (!target) return;


            event.preventDefault();


            const header =
                document.querySelector(".header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* ==========================================================
   ANIMAÇÃO DO DASHBOARD
========================================================== */

function initDashboardAnimation() {

    const dashboard =
        document.querySelector(".dashboard");

    if (!dashboard) return;


    /*
     * Não aplicamos mais rotateX/rotateY diretamente
     * para não conflitar com a animação float do CSS.
     *
     * O efeito agora é feito através de CSS variables.
     */

    dashboard.style.setProperty(
        "--mouse-x",
        "0deg"
    );

    dashboard.style.setProperty(
        "--mouse-y",
        "0deg"
    );


    document.addEventListener("mousemove", (event) => {

        /*
         * Só ativa o efeito em telas maiores.
         */

        if (window.innerWidth < 992) {

            dashboard.style.setProperty(
                "--mouse-x",
                "0deg"
            );

            dashboard.style.setProperty(
                "--mouse-y",
                "0deg"
            );

            return;

        }


        const x =
            (window.innerWidth / 2 - event.clientX) / 80;

        const y =
            (window.innerHeight / 2 - event.clientY) / 80;


        dashboard.style.setProperty(
            "--mouse-x",
            `${x}deg`
        );

        dashboard.style.setProperty(
            "--mouse-y",
            `${-y}deg`
        );

    });


    dashboard.addEventListener("mouseleave", () => {

        dashboard.style.setProperty(
            "--mouse-x",
            "0deg"
        );

        dashboard.style.setProperty(
            "--mouse-y",
            "0deg"
        );

    });

}


/* ==========================================================
   NAVEGAÇÃO ATIVA
========================================================== */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    const links =
        document.querySelectorAll(
            '.header__menu a[href^="#"]'
        );


    if (!sections.length || !links.length) return;


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const id =
                        entry.target.getAttribute("id");


                    links.forEach(link => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }

        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* ==========================================================
   PRELOAD / SITE CARREGADO
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
