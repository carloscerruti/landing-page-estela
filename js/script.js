// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    const yOffset = -80; // Ajuste conforme altura do seu header
    const target = document.getElementById('top');
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
        top: y,
        behavior: 'smooth'
    });
});




// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            mainNav.classList.remove('active');

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Seletores
const languageToggle = document.getElementById("languageToggle");
const languageDropdown = document.getElementById("languageDropdown");
const currentLangImg = document.getElementById("currentLanguage");
const languageLinks = document.querySelectorAll('.language-dropdown a');

// Abre/fecha dropdown ao clicar no botão
languageToggle.addEventListener("click", () => {
    languageDropdown.classList.toggle("show");
});

// Fecha o dropdown ao clicar fora
window.addEventListener("click", function (e) {
    if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove("show");
    }
});

// Muda a bandeira exibida no botão principal
function changeCurrentFlag(lang) {
    const flagMap = {
        pt: "br.webp",
        en: "eua.png",
        es: "esp.png"
    };
    currentLangImg.src = `images/${flagMap[lang]}`;
}

// Clica na bandeira → troca imagem e fecha menu
languageLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedLang = this.getAttribute('data-lang');
        changeCurrentFlag(selectedLang);
        languageDropdown.classList.remove("show");
    });
});

