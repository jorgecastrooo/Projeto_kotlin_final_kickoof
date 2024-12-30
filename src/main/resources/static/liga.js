
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
            // Função para criar uma liga
            function createLeague() {
                const name = document.getElementById("league-name").value;
                const description = document.getElementById("league-description").value;
                const maxClubs = parseInt(document.getElementById("max-clubs").value) || 25;
                if (maxClubs > 25) {
                    alert("O número máximo de clubes é 25. O valor será ajustado.");
                }
                const league = {
                    name,
                    description,
                    maxClubs: Math.min(maxClubs, 25),
                    clubs: clubs.slice(0, maxClubs) // Limita os clubes
                };
                leagues.push(league);
                updateLeagueList();
                updateEditLeagueSelect();
                updateDeleteLeagueSelect();
            }

            // Função para editar uma liga
            function editLeague() {
                const leagueIndex = document.getElementById("edit-league-select").selectedIndex - 1;
                if (leagueIndex < 0) return;

                const name = document.getElementById("edit-league-name").value;
                const description = document.getElementById("edit-league-description").value;
                const clubIndexes = Array.from(document.getElementById("edit-league-clubs").selectedOptions).map(option => option.value);

                leagues[leagueIndex].name = name;
                leagues[leagueIndex].description = description;
                leagues[leagueIndex].clubs = clubs.filter((club, index) => clubIndexes.includes(index.toString()));

                updateLeagueList();
            }

            // Função para eliminar uma liga
            function deleteLeague() {
                const leagueIndex = document.getElementById("delete-league-select").selectedIndex - 1;
                if (leagueIndex < 0) return;

                leagues.splice(leagueIndex, 1);
                updateLeagueList();
                updateEditLeagueSelect();
                updateDeleteLeagueSelect();
            }

            // Função para ajustar o número máximo de clubes
            function validateMaxClubsCreate() {
        const maxClubsInput = document.getElementById("max-clubs");
        let value = maxClubsInput.value;

        // Impede a entrada de letras e caracteres inválidos, mantendo apenas números
        if (/[^\d]/.test(value)) {
            maxClubsInput.value = value.replace(/[^\d]/g, '');  // Remove caracteres não numéricos
        }

        // Garantir que o valor seja numérico
        if (value !== '' && !isNaN(value)) {
            value = parseInt(value);

            // Ajusta para os limites de 1 a 25
            if (value > 25) {
                maxClubsInput.value = 25;
            } else if (value < 1) {
                maxClubsInput.value = 1;
            }
        }
    }

    function validateMaxClubsEdit() {
        const maxClubsInput = document.getElementById("edit-max-clubs");
        let value = maxClubsInput.value;

        // Impede a entrada de letras e caracteres inválidos, mantendo apenas números
        if (/[^\d]/.test(value)) {
            maxClubsInput.value = value.replace(/[^\d]/g, '');  // Remove caracteres não numéricos
        }

        // Garantir que o valor seja numérico
        if (value !== '' && !isNaN(value)) {
            value = parseInt(value);

            // Ajusta para os limites de 1 a 25
            if (value > 25) {
                maxClubsInput.value = 25;
            } else if (value < 1) {
                maxClubsInput.value = 1;
            }
        }
    }


            // Funções para atualizar os selects de editar e eliminar
            function updateEditLeagueSelect() {
                const select = document.getElementById("edit-league-select");
                select.innerHTML = '<option value="">Selecione uma Liga</option>';
                leagues.forEach((league, index) => {
                    const option = document.createElement("option");
                    option.value = index;
                    option.textContent = league.name;
                    select.appendChild(option);
                });
            }

            function updateDeleteLeagueSelect() {
                const select = document.getElementById("delete-league-select");
                select.innerHTML = '<option value="">Selecione uma Liga</option>';
                leagues.forEach((league, index) => {
                    const option = document.createElement("option");
                    option.value = index;
                    option.textContent = league.name;
                    select.appendChild(option);
                });
            }

            // Função para alternar visibilidade dos formulários
            function toggleContent(id) {
        const content = document.getElementById(`${id}-content`);
        if (!content) {
            console.error(`Elemento com ID '${id}-content' não encontrado.`);
            return;
        }
        content.classList.toggle('show');
        const button = document.querySelector(`button[onclick="toggleContent('${id}')"]`);
        if (button) {
            button.classList.toggle('open');
        }
    }


            // Função para preencher os clubes ao editar uma liga
            function populateEditClubs() {
                const select = document.getElementById("edit-league-clubs");
                const leagueIndex = document.getElementById("edit-league-select").selectedIndex - 1;
                if (leagueIndex < 0) return;

                const clubs = leagues[leagueIndex].clubs;
                select.innerHTML = "";
                clubs.forEach((club, index) => {
                    const option = document.createElement("option");
                    option.value = index;
                    option.textContent = club.name;
                    select.appendChild(option);
                });
            }

            // Função para listar as ligas
            function updateLeagueList() {
                const list = document.querySelector(".league-list ul");
                list.innerHTML = "";
                leagues.forEach(league => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<span>${league.name}</span> - ${league.description} (Max. Clubes: ${league.maxClubs})`;
                    list.appendChild(listItem);
                });
            }

 async function fetchNews() {
    try {
        const response = await fetch('http://localhost:8082/liga', {
            headers: { 'Accept': 'text/plain' }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar ligas: ${response.status}`);
        }

        const newsList = await response.text(); // Recebe as ligas como texto
        console.log(newsList); // Exibe as ligas no console

        // Processa os dados e atualiza os selects
        updateLeagueDropdowns(newsList);
    } catch (error) {
        console.error(error);
    }
}

function updateLeagueDropdowns(newsList) {
    const editSelect = document.getElementById("edit-league-select");
    const deleteSelect = document.getElementById("delete-league-select");

    // Limpa os dropdowns existentes
    editSelect.innerHTML = '<option value="">Selecione uma Liga</option>';
    deleteSelect.innerHTML = '<option value="">Selecione uma Liga</option>';

    // Divide o texto recebido em linhas
    const leagues = newsList.split("\n").filter(line => line.trim() !== "");

    const leagueObjects = leagues.map((league) => {
        const [name, description, maxClubs] = league.split(" - ");
        return {
            name: name.trim(),
            description: description.trim(),
            maxClubs: parseInt(maxClubs.trim(), 10),
        };
    });

    // Salva as ligas estruturadas para uso posterior
    window.leagues = leagueObjects;

    // Preenche os dropdowns
    leagueObjects.forEach((league) => {
        const editOption = document.createElement("option");
        editOption.value = league.name; // Define o valor como o texto da liga
        editOption.textContent = league.name; // Exibe o texto da liga
        editSelect.appendChild(editOption);

        const deleteOption = document.createElement("option");
        deleteOption.value = league.name; // Define o valor como o texto da liga
        deleteOption.textContent = league.name; // Exibe o texto da liga
        deleteSelect.appendChild(deleteOption);
    });
}

// Chamada para buscar os dados e preencher os dropdowns
fetchNews();

document.getElementById("edit-league-select").addEventListener("change", function () {
    const selectedIndex = this.selectedIndex - 1; // Ignorar a primeira opção "Selecione uma Liga"

    // Verificar se o índice é válido
    if (selectedIndex < 0 || selectedIndex >= window.leagues.length) {
        console.log("selectedIndex:", this.selectedIndex);
        // Limpar os campos se nenhuma liga estiver selecionada ou o índice for inválido
        document.getElementById("edit-league-name").value = "";
        document.getElementById("edit-league-description").value = "";
        document.getElementById("edit-max-clubs").value = "";
        return;
    }

    // Buscar os dados da liga selecionada
    const selectedLeague = window.leagues[selectedIndex];

    // Verificar se a liga existe
    if (!selectedLeague) {
        console.error("Liga não encontrada para o índice selecionado.");
        return;
    }

    // Preencher os campos com os dados da liga
    document.getElementById("edit-league-name").value = selectedLeague.name || "";
    document.getElementById("edit-league-description").value = selectedLeague.description || "";
    document.getElementById("edit-max-clubs").value = selectedLeague.maxClubs || 1;

    // Atualizar os clubes da liga
    const editLeagueClubsSelect = document.getElementById("edit-league-clubs");
    editLeagueClubsSelect.innerHTML = ""; // Limpar a lista de clubes

    selectedLeague.clubs.forEach((club, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = club || `Clube ${index + 1}`; // Fallback caso name não exista
        editLeagueClubsSelect.appendChild(option);
    });
});

window.onload = function() {
    // Captura o parâmetro de erro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    const errorMessageDiv = document.getElementById('error-message');

    // Exibe a mensagem de erro com base no status
    if (status === 'error_criar') {
        errorMessageDiv.innerHTML = 'Ocorreu um erro ao criar a liga. Por favor, tente novamente.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'exists_criar') {
        errorMessageDiv.innerHTML = 'Já existe uma liga com o mesmo nome.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'success_criar') {
        errorMessageDiv.innerHTML = 'Liga criada com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    } else if (status === 'error_editar') {
        errorMessageDiv.innerHTML = 'Ocorreu um erro ao editar a liga. Por favor, tente novamente.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'success_editar') {
        errorMessageDiv.innerHTML = 'Liga editada com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    } else if (status === 'error_delete') {
        errorMessageDiv.innerHTML = 'Erro ao excluir a liga.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'success_delete') {
        errorMessageDiv.innerHTML = 'Liga excluída com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    } else if (status === 'num_clubes_menor_que_max_editar') {
        errorMessageDiv.innerHTML = 'O número de clubes na liga não pode ser menor que o máximo permitido.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'campos_obrigatorios_editar') {
        errorMessageDiv.innerHTML = 'Todos os campos obrigatórios devem ser preenchidos.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'liga_ja_existente_editar') {
        errorMessageDiv.innerHTML = 'Já existe uma liga com o mesmo nome.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
};

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
