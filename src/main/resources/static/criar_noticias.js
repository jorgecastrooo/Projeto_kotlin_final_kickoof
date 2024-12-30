    function toggleMenu() {
        var menu = document.getElementById('menu');
        menu.style.left = menu.style.left === '0px' ? '-330px' : '0px';
        var menuItems = document.querySelectorAll('.menu ul li');
        menuItems.forEach(function (item, index) {
            setTimeout(function () {
                item.classList.toggle('show');
            }, index * 100);
        });
    }

    function filterNews() {
        var filterValue = document.getElementById('category-filter').value;
        console.log('Categoria selecionada: ' + filterValue);
        // Adicionar a lógica para filtrar as notícias
    }
     document.addEventListener('DOMContentLoaded', displayMessage);

    function displayMessage() {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');

        const messageContainer = document.getElementById('message');
        if (status === 'success') {
            messageContainer.style.color = 'green';
            messageContainer.textContent = 'Notícia criada com sucesso!';
        } else if (status === 'error') {
            messageContainer.style.color = 'red';
            messageContainer.textContent = 'Erro ao criar notícia. Tente novamente.';
        } else {
            messageContainer.textContent = '';
        }
    }
        document.addEventListener("DOMContentLoaded", function() {
            const username = "nomeDoUsuario"; // Modifique para obter o nome de usuário atual dinamicamente
            fetch(`/check-adm?username=${username}`)
                .then(response => response.text())
                .then(data => {
                    if (data === "adm") {
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

