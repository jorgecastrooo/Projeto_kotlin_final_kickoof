      function toggleMenu() {
     const menu = document.getElementById('menu');
     menu.style.left = (menu.style.left === '0px') ? '-330px' : '0';
     const menuItems = document.querySelectorAll('.menu ul li');
     menuItems.forEach((item, index) => {
       setTimeout(() => {
         item.classList.toggle('show');
       }, index * 100);
     });
   }


    document.getElementById('search-input').addEventListener('input', filterUsers);
    document.getElementById('adm-checkbox').addEventListener('change', filterUsers);

    function filterUsers() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const isAdmChecked = document.getElementById('adm-checkbox').checked;
        const userContainer = document.getElementById('user-container');

        // Limpa o container de usuários antes de adicionar novos filtrados
        userContainer.innerHTML = '';

        fetch('/users') // Requisição aos usuários
            .then(response => response.text())
            .then(userList => {
                const users = userList.split('\n');

                users.forEach(user => {
                    const [username, name, email, nationality, adm] = user.split(' - ');

                    // Filtra os usuários com base no username e status de ADM
                    if (username.toLowerCase().startsWith(searchInput)) {
                        // Filtra administradores ou todos os usuários
                        if (isAdmChecked && adm !== '1') return;  // Exibe apenas administradores
                        if (!isAdmChecked && adm === '1') return; // Não exibe administradores se checkbox não estiver marcada

                        const userInfoDiv = document.createElement('div');
                        userInfoDiv.classList.add('user-info');
                        userInfoDiv.innerHTML = `
                            <h3>Informações do Usuário</h3>
                            <div class="user-icon" style="margin-left: -650px;">
                                <i class="fas fa-user-alt" style="color: white; font-size: 70px;"></i>
                            </div>
                            <div class="info-line">
                                <p>Username: ${username}</p>
                            </div>
                            <div class="info-line">
                                <p>Nome: ${name}</p>
                            </div>
                            <div class="info-line">
                                <p>Email: ${email}</p>
                            </div>
                            <div class="info-line">
                                <p>Nacionalidade: ${nationality}</p>
                            </div>
                            <div class="info-line">
                                <p id="adm-status">ADM: ${adm === '1' ? 'Verdadeiro' : 'Falso'}</p>
                            </div>
                            <button class="delete">Eliminar conta</button>
                            <button class="make-adm" onclick="toggleAdmin(this)">
                                ${adm === '1' ? 'Remover Admin' : 'Tornar Admin'}
                            </button>
                        `;
                        userContainer.appendChild(userInfoDiv);

                        // Adiciona evento de clique ao botão "Eliminar conta"
                        const deleteButton = userInfoDiv.querySelector('.delete');
                        deleteButton.addEventListener('click', () => deleteUser(deleteButton));
                    }
                });
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }

function toggleAdmin(button) {
    const userInfoDiv = button.closest('.user-info');
    const admStatus = userInfoDiv.querySelector('#adm-status');
    const toggleButton = userInfoDiv.querySelector('.make-adm'); // Pegando o botão correto para alterar

    // Pegando o username a partir do conteúdo do parágrafo (assumindo que ele está no formato 'Username: nome_do_usuario')
    const username = userInfoDiv.querySelector('p').textContent.split(": ")[1];

    const isAdmin = admStatus.textContent.includes('Falso');

    // Fazendo a requisição POST para o servidor
    fetch('/toggle_admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'username': username,
        })
    })
    .then(response => {
        if (response.ok) {
            // Atualiza o status de ADM no front-end
            const newStatus = isAdmin ? 'Verdadeiro' : 'Falso';
            admStatus.textContent = `ADM: ${newStatus}`;
            toggleButton.textContent = isAdmin ? 'Remover Admin' : 'Tornar Admin';
            location.reload();
        } else {
            alert('Erro ao alterar status de admin.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao tentar alterar o status de admin!');
    });
}


    // Função para eliminar a conta do usuário
    function deleteUser(button) {
        const userInfoDiv = button.closest('.user-info');
        const username = userInfoDiv.querySelector('p').textContent.split(": ")[1];

        if (!username) {
            alert('Usuário não encontrado!');
            return;
        }

        // Envia a requisição POST para deletar o usuário
        fetch('/delete-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'username': username
            })
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url; // Redireciona para a URL fornecida na resposta
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao tentar deletar o usuário!');
        });
    }

    // Inicializa a lista de usuários ao carregar a página
    window.onload = filterUsers;

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