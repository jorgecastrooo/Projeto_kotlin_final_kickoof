    let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-container img');
const slideInterval = 3000;


function toggleMenu() {
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.menu-list li');
    if (menu.style.left === '-300px') {
        menu.style.left = '0';
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    } else {
        menu.style.left = '-300px';
        menuItems.forEach(item => {
            item.classList.remove('show');
        });
    }
}

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, slideInterval);

        document.addEventListener("DOMContentLoaded", function() {
            const username = "nomeDoUsuario"; // Modifique para obter o nome de usuário atual dinamicamente
            fetch(`/check-user?username=${username}`)
                .then(response => response.text())
                .then(data => {
                    if (data === "user") {
                        console.log("Usuário está logado");
                        // Você pode adicionar qualquer outra lógica aqui para usuários normais
                    } else {
                        window.location.href = data;
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        });

    document.addEventListener("DOMContentLoaded", function() {
            document.querySelector('.logout a').addEventListener('click', function(event) {
                event.preventDefault(); // Impede o comportamento padrão do link
                fetch('/logout')
                    .then(response => {
                        if (response.redirected) {
                            window.location.href = response.url;
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao fazer logout:', error);
                    });
            });
        });
