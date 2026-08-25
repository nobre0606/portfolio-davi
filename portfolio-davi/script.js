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

        window.addEventListener('hashchange', () => {
            if (window.location.hash === '#trim2') {
                activeTrim = 2;
                showTrim(2);
            } else if (window.location.hash === '#trim1') {
                activeTrim = 1;
                showTrim(1);
            }
        });

        toggle.addEventListener('click', () => {
            activeTrim = activeTrim === 1 ? 2 : 1;
            showTrim(activeTrim);
        });

        function showTrim(num) {
            const trim1Items = document.querySelectorAll('.trim1-item');
            const trim2Items = document.querySelectorAll('.trim2-item');
            if (num === 1) {
                toggle.classList.remove('active');
                trim2.classList.remove('trim-content--active');
                trim2.style.display = 'none';
                trim1.style.display = 'block';
                // força reflow para animação
                void trim1.offsetWidth;
                trim1.classList.add('trim-content--active');
                trim1Items.forEach(el => el.style.display = 'block');
                trim2Items.forEach(el => el.style.display = 'none');
            } else {
                toggle.classList.add('active');
                trim1.classList.remove('trim-content--active');
                trim1.style.display = 'none';
                trim2.style.display = 'block';
                // força reflow para animação
                void trim2.offsetWidth;
                trim2.classList.add('trim-content--active');
                trim1Items.forEach(el => el.style.display = 'none');
                trim2Items.forEach(el => el.style.display = 'block');
            }
        }
    }

    // SMOOTH SCROLL PARA SEÇÕES DA NAVBAR
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = link.getAttribute('href');
            // Deixa o hashchange lidar com a troca de trimestre e extras
            if (hash === '#trim1' || hash === '#trim2' || hash === '#extras') return;
            
            e.preventDefault();
            const sectionName = hash.substring(1); 
            const activeContent = document.querySelector('.trim-content--active');
            
            if (activeContent) {
                let target = activeContent.querySelector('#' + sectionName);
                
                if (!target) {
                    const titleMap = {
                        'ensino-medio': 'Ensino Médio',
                        'humanas': 'Ciências Humanas',
                        'natureza': 'Ciências da Natureza',
                        'matematica': 'Matemática',
                        'linguagens': 'Linguagens',
                        'tecnico': 'Técnico',
                        'modelagem': 'Modelagem de Sistemas',
                        'banco-dados': 'Banco de Dados',
                        'programacao': 'Programação de Aplicativos'
                    };
                    const searchTitle = titleMap[sectionName];
                    if (searchTitle) {
                        const headings = Array.from(activeContent.querySelectorAll('h1, h2'));
                        const heading = headings.find(h => h.textContent.includes(searchTitle));
                        if (heading) {
                            target = heading.parentElement; 
                        }
                    }
                }
                
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const topPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
                    window.scrollTo({ top: topPos, behavior: 'smooth' });
                }
            }
        });
    });
});
