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
    initModalWhatsApp();

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
   MODAL E ENVIO PARA O WHATSAPP
========================================================== */

function initModalWhatsApp() {

    const modal = document.getElementById("demoModal");
    const openButtons = document.querySelectorAll(".open-modal-btn");
    const closeButton = document.getElementById("closeModal");
    const demoForm = document.getElementById("demoForm");

    if (!modal) return;

    // Abrir modal ao clicar nos botões de demonstração ou orçamento
    if (openButtons.length > 0) {
        openButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                modal.classList.add("active");
            });
        });
    }

    // Fechar modal pelo botão 'X'
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // Fechar modal clicando fora da caixa de conteúdo
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // Enviar dados montando a URL do WhatsApp
    if (demoForm) {
        demoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const company = document.getElementById("company").value.trim();
            const interest = document.getElementById("interest").value;

            // Número do WhatsApp da APK Soluções (DDD 61 + 995749898)
            const phoneNumber = "5561995749898";

            // Montagem da mensagem formatada
            const message = `Olá! Meu nome é *${name}*, represento a empresa *${company}* e tenho interesse em saber mais sobre *${interest}*. Poderia me ajudar?`;

            // Codifica a mensagem para o padrão de URL
            const encodedMessage = encodeURIComponent(message);

            // Abre o WhatsApp com a mensagem preenchida
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            window.open(whatsappURL, "_blank");

            // Fecha o modal e limpa o formulário
            modal.classList.remove("active");
            demoForm.reset();
        });
    }

}


/* ==========================================================
   PRELOAD / SITE CARREGADO
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
