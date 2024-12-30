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

function toggleContent(formType) {
    const content = document.getElementById(`${formType}-content`);
    if (content) {
        content.classList.toggle('show');
        const icon = document.querySelector(`button[onclick="toggleContent('${formType}')"] i`);
        if (icon) {
            icon.classList.toggle('open');
        }
    } else {
        console.error(`Elemento com ID ${formType}-content não encontrado.`);
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

            // Processa a lista para extrair os nomes das equipes antes do traço
            const teamNames = clubelist.map(club => club.split(" - ")[0].trim());

            // Preenche as comboboxes com os nomes das equipes
            const homeTeamSelect = document.getElementById('home-team');
            const awayTeamSelect = document.getElementById('away-team');

            teamNames.forEach(team => {
                if (team) { // Evita adicionar entradas vazias
                    const homeOption = document.createElement('option');
                    const awayOption = document.createElement('option');

                    homeOption.value = team;
                    homeOption.textContent = team;

                    awayOption.value = team;
                    awayOption.textContent = team;

                    homeTeamSelect.appendChild(homeOption);
                    awayTeamSelect.appendChild(awayOption);
                }
            });

            // Adiciona eventos para garantir que uma equipe selecionada em uma combobox não apareça na outra
            homeTeamSelect.addEventListener('change', () => updateAvailableOptions(homeTeamSelect, awayTeamSelect));
            awayTeamSelect.addEventListener('change', () => updateAvailableOptions(awayTeamSelect, homeTeamSelect));
        } catch (error) {
            console.error('Erro ao carregar clubes:', error);
        }
    }

    // Função para desabilitar a opção selecionada em outra combobox
    function updateAvailableOptions(selectedSelect, otherSelect) {
        const selectedValue = selectedSelect.value;

        // Itera por todas as opções da outra combobox
        Array.from(otherSelect.options).forEach(option => {
            if (option.value === selectedValue) {
                option.disabled = true; // Desabilita a opção que foi selecionada
            } else {
                option.disabled = false; // Reabilita as outras opções
            }
        });
    }

fetchClubs();

    function getGames() {
    fetch('/get-games')  // Requisição para o servidor
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar jogos');
            }
            return response.text();  // Aqui, a resposta é tratada como texto simples
        })
        .then(data => {

            // Converte a resposta para um formato de lista
            const gamesList = data.split("\n");

            // Popula a combobox de editar jogo
            const editGameSelect = document.getElementById('edit-game-select');
            const deleteGameSelect = document.getElementById('delete-league-select');

            gamesList.forEach(game => {
                const option = document.createElement('option');
                const gameDetailsArray = game.split(" - ");
                const gameName = gameDetailsArray[0].trim(); // Nome do jogo
                const gameDate = gameDetailsArray[1].trim().replace("Data:", "").trim();
                const gameTime = gameDetailsArray[2].trim().replace("Hora:", "").trim();

                // Armazenar detalhes do jogo
                gameDetails[gameName] = { date: gameDate, time: gameTime };

                // Adicionar opção na combobox de editar
                option.value = gameName;
                option.textContent = gameName; // Exibe apenas o nome do jogo
                editGameSelect.appendChild(option);

                // Adicionar a mesma opção na combobox de eliminar
                const deleteOption = document.createElement('option');
                deleteOption.value = gameName;
                deleteOption.textContent = gameName;
                deleteGameSelect.appendChild(deleteOption);
            });

            // Atualiza os campos quando o jogo for selecionado para editar
            editGameSelect.addEventListener('change', updateGameInfo);
        })
        .catch(error => {
            console.error(error);  // Exibe o erro, se houver
        });
    }

// Armazenar detalhes dos jogos para edição
const gameDetails = {};

function updateGameInfo() {
    const selectedGameName = document.getElementById('edit-game-select').value;
    const gameDetailsForSelected = gameDetails[selectedGameName];

    if (gameDetailsForSelected) {
        const gameDate = gameDetailsForSelected.date;  // Exemplo: "2025-01-03"
        const gameTime = gameDetailsForSelected.time;  // Exemplo: "17:22"

        if (gameDate && gameTime) {
            // Atualiza o valor do campo de data
            document.getElementById('edit-game-date').value = gameDate;

            // Atualiza o valor do campo de hora
            document.getElementById('edit-game-time').value = gameTime;
        }
    } else {
        // Limpa os campos caso o jogo não tenha sido encontrado
        document.getElementById('edit-game-date').value = '';
        document.getElementById('edit-game-time').value = '';
    }
}


   window.onload = function()
  {
    // Captura o parâmetro de erro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    const errorMessageDiv = document.getElementById('error-message');

     if (status === 'error_campos') {
        errorMessageDiv.innerHTML = 'preencha todos os campos.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'error_date_time') {
        errorMessageDiv.innerHTML = 'Insira uma data superior ou igual a hoje e uma hora superior.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'success_create') {
        errorMessageDiv.innerHTML = 'jogo criado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    }
    else if (status === 'error_create') {
        errorMessageDiv.innerHTML = 'Erro ao criar jogo.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
     else  if (status === 'error_teams_already_have_game') {
        errorMessageDiv.innerHTML = 'Uma das equipas colocadas ja tem um jogo nesse dia.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
    else  if (status === 'error_same_teams') {
        errorMessageDiv.innerHTML = 'nao coloque a mesma equipa nos dois campos';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
    else  if (status === 'error_game_exists') {
        errorMessageDiv.innerHTML = 'Este jogo ja foi criado.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
    else if (status === 'sucesso-delete') {
        errorMessageDiv.innerHTML = 'jogo eliminado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    }
    else  if (status === 'jogo_nao_encontrado') {
        errorMessageDiv.innerHTML = 'jogo nao encontrado.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
    else  if (status === 'erro-delete') {
        errorMessageDiv.innerHTML = 'Erro ao tentar eliminar jogo';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else  if (status === 'erro-edit') {
        errorMessageDiv.innerHTML = 'Erro ao tentar editar jogo';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }else if (status === 'success_edit') {
        errorMessageDiv.innerHTML = 'jogo editado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    }
    else  if (status === 'error_date_time_edit') {
        errorMessageDiv.innerHTML = 'Erro ao tentar editar jogo';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else  if (status === 'error_different_league') {
             errorMessageDiv.innerHTML = 'Erro as equipas sao de ligas diferentes';
             errorMessageDiv.style.display = 'block';
             errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
         }
    getGames();
  };
