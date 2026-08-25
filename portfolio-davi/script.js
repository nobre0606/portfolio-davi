document.addEventListener("DOMContentLoaded", () => {
    // NAVBAR SCROLL
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // TRIM TOGGLE
    const toggle = document.getElementById('trimToggle');
    const trim1 = document.getElementById('trim1-content');
    const trim2 = document.getElementById('trim2-content');

    if (toggle && trim1 && trim2) {
        let activeTrim = 1;

        // Verifica se a URL tem âncora #trim2
        if (window.location.hash === '#trim2') {
            activeTrim = 2;
            showTrim(2);
        }

        toggle.addEventListener('click', () => {
            activeTrim = activeTrim === 1 ? 2 : 1;
            showTrim(activeTrim);
        });

        function showTrim(num) {
            if (num === 1) {
                toggle.classList.remove('active');
                trim2.classList.remove('trim-content--active');
                trim2.style.display = 'none';
                trim1.style.display = 'block';
                // força reflow para animação
                void trim1.offsetWidth;
                trim1.classList.add('trim-content--active');
            } else {
                toggle.classList.add('active');
                trim1.classList.remove('trim-content--active');
                trim1.style.display = 'none';
                trim2.style.display = 'block';
                // força reflow para animação
                void trim2.offsetWidth;
                trim2.classList.add('trim-content--active');
            }
        }
    }
});
