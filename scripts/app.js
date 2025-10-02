particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 700
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 130,
          "size_min": 0.01,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 80,
        "color": "#ffffff",
        "opacity": 0.5,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 300,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 150,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 1
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#000000ff",
      "background_image": "",
      "background_position": "30% 30%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

// Funcionalidade do menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Função para toggle do menu
    function toggleMenu() {
        const isOpen = menuToggle.classList.contains('active');
        
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Atualiza atributos ARIA
        menuToggle.setAttribute('aria-expanded', !isOpen);
        menuToggle.setAttribute('aria-label', !isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }

    // Função para fechar o menu
    function closeMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }

    // Toggle do menu ao clicar no botão
    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove a classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            // Adiciona a classe active ao link clicado
            this.classList.add('active');
            closeMenu();
        });
    });

    // Funcionalidade para detectar seção ativa baseada no scroll
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset para considerar o header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Detecta a seção ativa ao fazer scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Define o primeiro link como ativo inicialmente
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Navegar pelo menu com teclado
    document.addEventListener('keydown', function(e) {
        // Fecha o menu ao pressionar ESC
        if (e.key === 'Escape') {
            closeMenu();
            menuToggle.focus(); // Retorna o foco para o botão
        }
        
        // Navegar pelos links com Tab no menu aberto
        if (navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('a[href]');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                // Se estiver no último elemento e pressionar Tab, vai para o primeiro
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
                // Se estiver no primeiro elemento e pressionar Shift+Tab, vai para o último
                else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // Ao redimensionar a tela, fecha o menu se estiver aberto
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
});