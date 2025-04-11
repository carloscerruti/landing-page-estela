document.addEventListener('DOMContentLoaded', function () {
    // Menu de navegação para mobile
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');

            // Alterna o ícone do menu
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu quando um link é clicado
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Seletor de idioma
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguage = document.getElementById('currentLanguage');

    if (languageToggle) {
        languageToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
    }

    if (languageDropdown) {
        const languageOptions = languageDropdown.querySelectorAll('a');

        languageOptions.forEach(option => {
            option.addEventListener('click', function (e) {
                e.preventDefault();
                const langCode = this.getAttribute('data-lang');
                const imgSrc = this.querySelector('img').src;

                // Atualiza imagem do idioma atual
                currentLanguage.src = imgSrc;

                // Aqui você pode adicionar lógica para mudar o idioma do site
                languageDropdown.classList.remove('active');
            });
        });
    }

    // Fechar dropdown de idioma ao clicar fora
    document.addEventListener('click', function (e) {
        if (languageDropdown && languageDropdown.classList.contains('active')) {
            if (!e.target.closest('.language-selector')) {
                languageDropdown.classList.remove('active');
            }
        }
    });

    // Botão Voltar ao Topo
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
    }

    // Header fixo com mudança de estilo ao rolar
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 100) {
                header.style.padding = '5px 0';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '';
                header.style.background = '';
                header.style.boxShadow = '';
            }
        });
    }

    // Animação de fade-in para elementos ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Elementos a serem animados
    const animatedElements = document.querySelectorAll('.section-title, .service-card, .step, .testimonial-card, .achievement');

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Validação do formulário
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const service = document.getElementById('service');
            const message = document.getElementById('message');

            // Validação básica
            if (name.value.trim() === '') {
                valid = false;
                highlightField(name);
            }

            if (email.value.trim() === '' || !isValidEmail(email.value)) {
                valid = false;
                highlightField(email);
            }

            if (service.value === '') {
                valid = false;
                highlightField(service);
            }

            if (message.value.trim() === '') {
                valid = false;
                highlightField(message);
            }

            if (!valid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            }
        });
    }

    function highlightField(field) {
        field.style.borderColor = 'red';
        field.addEventListener('input', function () {
            this.style.borderColor = '';
        }, { once: true });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});