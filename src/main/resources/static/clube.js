    function toggleContent(section) {
        const content = document.getElementById(section + '-content');
        if (content) {
            const icon = document.querySelector(`#${section}-content ~ .toggle-btn i`);
            content.classList.toggle('show');
            if (icon) {
                icon.classList.toggle('fa-chevron-up');
                icon.classList.toggle('fa-chevron-down');
            }
        }
    }



    function validateYear() {
        const yearInput = document.getElementById('team-foundation');
        let year = yearInput.value;
        const currentYear = new Date().getFullYear();
        const errorMessage = document.getElementById('foundation-error');

        // Reset any previous error
        errorMessage.style.display = 'none';

        // Impede a entrada de letras e caracteres inválidos
        if (/[^\d]/.test(year)) {
            yearInput.value = year.replace(/[^\d]/g, '');  // Remove caracteres não numéricos
        }

        // Garantir que o ano seja numérico
        if (year !== '' && !isNaN(year)) {
            if (year > currentYear) {
                yearInput.value = currentYear;  // Ajusta para o ano atual se for maior
                errorMessage.style.display = 'block';
            }
        }
    }
    function validateEditYear() {
        const yearInput = document.getElementById('edit-team-foundation');
        let year = yearInput.value;
        const currentYear = new Date().getFullYear();
        const errorMessage = document.getElementById('foundation-error-edit');

        // Reset any previous error
        errorMessage.style.display = 'none';

        // Impede a entrada de letras e caracteres inválidos
        if (/[^\d]/.test(year)) {
            yearInput.value = year.replace(/[^\d]/g, '');  // Remove caracteres não numéricos
        }

        // Garantir que o ano seja numérico
        if (year !== '' && !isNaN(year)) {
            if (year > currentYear) {
                yearInput.value = currentYear;  // Ajusta para o ano atual se for maior
                errorMessage.style.display = 'block';
            }
        }
    }

    function toggleMenu() {
        const menu = document.getElementById('menu');
        const menuItems = document.querySelectorAll('.menu-list li');

        if (menu.style.left === '-330px') {
            menu.style.left = '0'; // Move o menu para a direita
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show'); // Adiciona a classe 'show' após cada delay
                }, index * 100);
            });
        } else {
            menu.style.left = '-330px'; // Move o menu de volta para fora da tela
            menuItems.forEach(item => {
                item.classList.remove('show'); // Remove a classe 'show' ao fechar
            });
        }
    }

  async function fetchLigas() {
    try {
        const response = await fetch('http://localhost:8082/liga', {
            headers: { 'Accept': 'text/plain' }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar ligas: ${response.status}`);
        }

        const ligas = await response.text(); // Recebe as ligas como texto
        const ligasArray = ligas.split("\n"); // Divide em linhas

        // Extrai apenas o primeiro elemento (nomeliga) antes do "-"
        const nomeligas = ligasArray.map(liga => liga.split(" - ")[0].trim());

        // Atualiza os selects com as ligas
        const leagueSelects = document.querySelectorAll('#team-league, #edit-team-league');
        leagueSelects.forEach(select => {
            select.innerHTML = '<option value="">Selecione a Liga</option>'; // Limpa as opções anteriores
            nomeligas.forEach(nomeliga => {
                if (nomeliga) { // Adiciona somente se não for vazio
                    select.innerHTML += `<option value="${nomeliga}">${nomeliga}</option>`;
                }
            });
        });
    } catch (error) {
        console.error('Erro ao carregar as ligas:', error);
    }
}

// Chama a função para carregar as ligas
fetchLigas();

       window.onload = function() {
    // Captura o parâmetro de erro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    const errorMessageDiv = document.getElementById('error-message');

    // Exibe a mensagem de erro com base no status
    if (status === 'error') {
        errorMessageDiv.innerHTML = 'Ocorreu um erro. Por favor, tente novamente.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'clube_exists') {
        errorMessageDiv.innerHTML = 'Já existe um clube com o mesmo nome.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'liga_not_exists') {
        errorMessageDiv.innerHTML = 'A liga selecionada não existe.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'success') {
        errorMessageDiv.innerHTML = 'Clube criado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    }
    else if (status === 'success_delete') {
        errorMessageDiv.innerHTML = 'Clube eliminado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    }
    else if (status === 'error_delete') {
        errorMessageDiv.innerHTML = 'Erro ao eliminar o clube.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
    else if (status === 'success_edit') {
        errorMessageDiv.innerHTML = 'Clube atualizado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    } else  if (status === 'error_edit') {
        errorMessageDiv.innerHTML = 'Ocorreu um erro. Por favor, tente novamente.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
};

  let clubDetails = {}; // Objeto para armazenar os detalhes dos clubes

async function fetchClubs() {
    try {
        const response = await fetch('http://localhost:8082/clube', {
            headers: { 'Accept': 'text/plain' } // Esperando texto como resposta
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar clubes: ${response.status}`);
        }

        const clubes = await response.text(); // Recebe os clubes como texto
        const clubelist = clubes.split("\n"); // Divide as informações dos clubes em uma lista de strings

        // Exibe o conteúdo de clubelist no console
        console.log(clubelist);

        // Processar os detalhes de cada clube e armazenar em clubDetails
        clubelist.forEach(clube => {
            // Verifica se a linha tem o formato esperado (5 partes separadas por " - ")
            const parts = clube.split(" - ").map(item => item.trim());

            // Só processa a linha se tiver exatamente 5 partes
            if (parts.length === 5) {
                const [name, league, coach, foundation, players] = parts;
                if (name) {
                    clubDetails[name] = { league, coach, foundation, players }; // Armazena os detalhes do clube
                }
            }
        });

        // Atualizar as comboboxes
        const selectClubs = document.querySelectorAll('#select-club, #select-club-2'); // Seleciona ambas as comboboxes
        selectClubs.forEach(select => {
            select.innerHTML = '<option value="">Escolha um clube...</option>'; // Limpa as opções anteriores
            Object.keys(clubDetails).forEach(clubName => {
                const option = document.createElement('option');
                option.value = clubName; // Nome do clube
                option.textContent = clubName; // Texto completo com o nome do clube
                select.appendChild(option);
            });
        });

    } catch (error) {
        console.error('Erro ao carregar clubes:', error);
    }
}



fetchClubs();

    function loadClubDetails() {
    const selectedClub = document.getElementById('select-club').value; // Nome do clube selecionado
    const editForm = document.getElementById('edit-form');

    if (selectedClub && clubDetails[selectedClub]) {
        const { league, coach, foundation, players } = clubDetails[selectedClub];

        // Preenche os campos com os detalhes do clube
        document.getElementById('edit-team-name').value = selectedClub; // Nome do clube
        document.getElementById('edit-team-league').value = league || ''; // Liga
        document.getElementById('edit-team-coach').value = coach || ''; // Treinador
        document.getElementById('edit-team-foundation').value = foundation || ''; // Ano de fundação
        document.getElementById('edit-team-players').value = players ? players.replace(/,/g, '\n') : ''; // Jogadores

        // Mostra o formulário de edição
        editForm.style.display = 'block';
    } else {
        // Limpa os campos se nenhum clube for selecionado
        editForm.style.display = 'none';
        document.getElementById('edit-team-name').value = '';
        document.getElementById('edit-team-league').value = '';
        document.getElementById('edit-team-coach').value = '';
        document.getElementById('edit-team-foundation').value = '';
        document.getElementById('edit-team-players').value = '';
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
