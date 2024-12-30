        let currentAction = '';

     let teamsPlayers = {}; // Objeto para armazenar os jogadores das equipes

function extractPlayers(playerString) {
    // Verifica se a string de jogadores está vazia ou inválida
    if (!playerString) {
        return []; // Retorna um array vazio caso não haja jogadores
    }
    const players = playerString.split(",").map(player => player.trim());
    return players;
}

  function updatePlayers(team) {
        const playerSelectGoal = document.getElementById("player-goal");
        const playerSelectCard = document.getElementById("player-card");
        playerSelectGoal.innerHTML = ''; // Limpa as opções existentes para Gol
        playerSelectCard.innerHTML = ''; // Limpa as opções existentes para Cartão

        if (teamsPlayers[team]) {
            let players = teamsPlayers[team];

            // Verifica se os jogadores estão em formato de string
            if (typeof players === 'string') {
                players = players.split(",").map(player => player.trim());
            }

            // Atualiza os jogadores na combobox de Gol
            players.forEach(player => {
                const optionGoal = document.createElement("option");
                optionGoal.value = player;
                optionGoal.textContent = player;
                playerSelectGoal.appendChild(optionGoal);

                // Atualiza os jogadores na combobox de Cartão
                const optionCard = document.createElement("option");
                optionCard.value = player;
                optionCard.textContent = player;
                playerSelectCard.appendChild(optionCard);
            });
        } else {
            const optionGoal = document.createElement("option");
            optionGoal.value = '';
            optionGoal.textContent = 'Sem jogadores disponíveis';
            playerSelectGoal.appendChild(optionGoal);

            const optionCard = document.createElement("option");
            optionCard.value = '';
            optionCard.textContent = 'Sem jogadores disponíveis';
            playerSelectCard.appendChild(optionCard);
        }
    }

  function openActionModal(action, index) {
    currentAction = action;
    const modal = document.getElementById("action-modal");
    const title = document.getElementById("modal-title");
    const goalOptions = document.getElementById("goal-options");
    const cardOptions = document.getElementById("card-options");
    const substitutionOptions = document.getElementById("substitution-options");

    const gameCard = document.getElementById(`result-card-${index}`);
    const equipeCasaNome = gameCard.querySelector('.team-name').innerText;
    const equipeForaNome = gameCard.querySelectorAll('.team-name')[1].innerText;

    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = ''; // Limpa as opções existentes
    const optionDefault = document.createElement("option");
    optionDefault.value = '';
    optionDefault.textContent = 'Selecione o Clube';
    optionDefault.disabled = true;
    optionDefault.selected = true;

    // Adiciona o valor padrão
    teamSelect.appendChild(optionDefault);

    // Adiciona as opções de clubes
    const option1 = document.createElement("option");
    option1.value = equipeCasaNome;
    option1.textContent = equipeCasaNome;
    const option2 = document.createElement("option");
    option2.value = equipeForaNome;
    option2.textContent = equipeForaNome;

    teamSelect.appendChild(option1);
    teamSelect.appendChild(option2);

    // Exibe o modal com as opções apropriadas
    if (action === 'gol') {
        title.innerHTML = 'Registrar Gol/Autogol';
        goalOptions.style.display = 'block';
        cardOptions.style.display = 'none';
        substitutionOptions.style.display = 'none';
    } else if (action === 'substituicao') {
        title.innerHTML = 'Registrar Substituição';
        goalOptions.style.display = 'none';
        cardOptions.style.display = 'none';
        substitutionOptions.style.display = 'block';
    } else if (action === 'cartao') {
        title.innerHTML = 'Registrar Cartão';
        goalOptions.style.display = 'none';
        cardOptions.style.display = 'block';
        substitutionOptions.style.display = 'none';
    }

    // Atualiza os jogadores quando a equipe for selecionada
    teamSelect.addEventListener('change', (event) => {
        const selectedTeam = event.target.value;
        updatePlayers(selectedTeam); // Atualiza os jogadores da equipe selecionada
    });

    // Preenche os jogadores para o time inicial
    updatePlayers(equipeCasaNome);

    modal.style.display = "flex";
}

        function closeModal() {
            document.getElementById("action-modal").style.display = "none";
            document.getElementById('club-input').value = '';  // Limpa o campo
            document.getElementById('club-input-1').value = ''; // Limpa o campo
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

// Função para extrair gols de uma string
function extractGoals(text) {
    const goalMatch = text?.match(/Gols: (\d+)/); // Regex para capturar a quantidade de gols
    return goalMatch ? goalMatch[1] : '0'; // Retorna os gols encontrados ou '0' se não houver
}
let cnt=0;
function displayGames(gamesList) {
    const resultsSection = document.querySelector('.results-section');
    resultsSection.innerHTML = ''; // Limpa a seção antes de adicionar os novos jogos

    gamesList.forEach((gameText, index) => {
        const gameInfo = gameText.split("\n").map(line => line.trim()); // Remove espaços extras

        // Verifica se o formato do jogo está correto
        if (gameInfo.length < 5) {
            console.error("Formato inválido para o jogo:", gameText);
            return; // Ignora o jogo com formato inválido
        }

        // Extraímos as informações do jogo com base nos índices fixos
        const jogoNome = gameInfo[0-cnt]?.split(": ")[1] || 'Nome não encontrado';
        const jogoHora = gameInfo[1-cnt]?.split(": ")[1] || 'Hora não encontrada';
        const jogoEstado = gameInfo[2-cnt]?.split(": ")[1] || 'Pendente';

        // Extração de dados da equipe Casa
        const equipeCasaInfo = gameInfo[3-cnt]?.split(": ")[1]?.split(" - ") || [];
        const equipeCasaNome = equipeCasaInfo[0]?.trim() || 'Equipe Casa não encontrada';
        const equipeCasaGols = extractGoals(gameInfo[3-cnt]) || '0';
        const equipeCasaJogadores = gameInfo[3-cnt]?.split("Jogadores: ")[1]?.trim() || 'Jogadores não encontrados';

        // Extração de dados da equipe Fora
        const equipeForaInfo = gameInfo[4-cnt]?.split(": ")[1]?.split(" - ") || [];
        const equipeForaNome = equipeForaInfo[0]?.trim() || 'Equipe Fora não encontrada';
        const equipeForaGols = extractGoals(gameInfo[4-cnt]) || '0';
        const equipeForaJogadores = gameInfo[4-cnt]?.split("Jogadores: ")[1]?.trim() || 'Jogadores não encontrados';

            teamsPlayers[equipeCasaNome] = extractPlayers(equipeCasaJogadores);
            teamsPlayers[equipeForaNome] = extractPlayers(equipeForaJogadores);

        // Constrói o HTML para o jogo
        const gameCard = `
            <div class="result-card" id="result-card-${index + 1}">
                <div class="result-header">
                    <!-- Equipe Casa -->
                    <div class="result-team">
                        <div class="team-name">${equipeCasaNome}</div>
                        <div class="team-score" id="score-team-a-${index + 1}">${equipeCasaGols}</div>
                    </div>

                    <!-- Hora do Jogo -->
                    <div class="match-details">
                        <span>${jogoHora}</span>
                        <select id="status-game-${index + 1}"  onchange="updateGameStatus('${jogoNome}', this.value)">
                            <option value="Pendente" ${jogoEstado === 'Pendente' ? 'selected' : ''}>Pendente</option>
                            <option value="Intervalo" ${jogoEstado === 'Intervalo' ? 'selected' : ''}>Intervalo</option>
                            <option value="Em andamento" ${jogoEstado === 'Em andamento' ? 'selected' : ''}>Em andamento</option>
                            <option value="Terminado" ${jogoEstado === 'Terminado' ? 'selected' : ''}>Terminado</option>
                        </select>
                    </div>

                    <!-- Equipe Fora -->
                    <div class="result-team">
                        <div class="team-name">${equipeForaNome}</div>
                        <div class="team-score" id="score-team-b-${index + 1}">${equipeForaGols}</div>
                    </div>
                </div>
                <div class="edit-options">
                    <button onclick="openActionModal('gol', ${index + 1})">Registrar Gol/Autogol</button>
                    <button onclick="openActionModal('cartao', ${index + 1})">Registrar Cartão</button>
                </div>
            </div>
        `;

            cnt=-1;

        // Exibe o jogo no site
        resultsSection.innerHTML += gameCard;
    });
}

   // Função para carregar e exibir os jogos
async function fetchGames() {
    try {
        const response = await fetch('http://localhost:8082/load-game', {
            headers: { 'Accept': 'text/plain' }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar jogos: ${response.status}`);
        }

        const gamesText = await response.text(); // Recebe os jogos como texto

        if (!gamesText) {
            throw new Error('Resposta da API está vazia.');
        }

        const gamesList = gamesText.split("\n\n"); // Divide os jogos em blocos de dois '\n'

        // Para cada jogo, extraímos os jogadores das equipes e associamos ao time
        gamesList.forEach(gameText => {
            const gameInfo = gameText.split("\n").map(line => line.trim());
            const equipeCasaInfo = gameInfo[3]?.split(": ")[1]?.split(" - ") || [];
            const equipeCasaNome = equipeCasaInfo[0]?.trim() || 'Equipe Casa não encontrada';
            const equipeCasaJogadores = gameInfo[3]?.split("Jogadores: ")[1]?.trim() || '';

            const equipeForaInfo = gameInfo[4]?.split(": ")[1]?.split(" - ") || [];
            const equipeForaNome = equipeForaInfo[0]?.trim() || 'Equipe Fora não encontrada';
            const equipeForaJogadores = gameInfo[4]?.split("Jogadores: ")[1]?.trim() || '';

        });

        // Exibe os jogos na página
        displayGames(gamesList);
    } catch (error) {
        console.error('Erro ao carregar jogos:', error);
    }
}

// Chama a função para carregar e exibir os jogos
fetchGames();

document.getElementById('team-select').addEventListener('change', function() {
    // Obtém o valor selecionado da combobox
    const selectedClub = this.value;

    // Atualiza o valor do input com o valor selecionado
    document.getElementById('club-input').value = selectedClub;
    document.getElementById('club-input-1').value = selectedClub;
});

 function updateGameStatus(jogoNome, status) {
    // Verifica se os campos estão preenchidos
    if (!jogoNome || !status) {
        // Redireciona para a página com o status 'campos_vazios'
        window.location.href = '/static/editar_resultado.html?status=campos_vazios';
        return;
    }

    // Faz a requisição POST para atualizar o status
    fetch('/update-game-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Formato de dados
        },
        body: new URLSearchParams({
            jogoNome: jogoNome,
            status: status
        })
    })
    .then(response => {
        if (response.ok) {
            // Quando a resposta for ok, captura o redirect URL do corpo da resposta
            return response.text();  // Lê a URL de redirecionamento
        } else {
            // Caso a resposta seja inválida, faz o redirecionamento direto
            window.location.href = '/static/editar_resultado.html?status=status_invalido';
        }
    })
    .then(redirectUrl => {
        // Redireciona para a URL retornada pela resposta do servidor
        window.location.href = redirectUrl;
    })
    .catch(error => {
        // Caso ocorra algum erro na requisição
        console.error('Erro ao atualizar o status do jogo:', error);
        // Redireciona com status 'erro_desconhecido'
        window.location.href = '/static/editar_resultado.html?status=erro_desconhecido';
    });
}

      window.onload = function() {
    // Captura o parâmetro de erro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    const errorMessageDiv = document.getElementById('error-message');

    // Exibe a mensagem de erro com base no status
    if (status === 'campos_vazios') {
        errorMessageDiv.innerHTML = 'Preencha  todos os campos.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'clube-nao-existe') {
        errorMessageDiv.innerHTML = 'O clube inserido nao existe.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'jogo-nao-em-andamento') {
        errorMessageDiv.innerHTML = 'O jogo precisa estar a decorrer para registar o acontecimento';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'sucesso-golo') {
        errorMessageDiv.innerHTML = 'Golo registado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    } else if (status === 'erro-cartao-vermelho-ou-amarelo') {
        errorMessageDiv.innerHTML = 'Erro ao registar o jogador ja foi expulso.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
    else if (status === 'jogo-nao-encontrado') {
        errorMessageDiv.innerHTML = 'Não foi possivel encontrar o jogo';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor verde para sucesso
    } else  if (status === 'erro-processamento') {
        errorMessageDiv.innerHTML = 'Ocorreu um erro. Por favor, tente novamente.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'sucesso-card') {
        errorMessageDiv.innerHTML = 'Cartao registado com sucesso!';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    }else  if (status === 'transicao_invalida') {
        errorMessageDiv.innerHTML = 'A transição de status fornecida não é permitida. Certifique-se de seguir a ordem correta: "Pendente" → "Em andamento" → "Intervalo" → "Terminado".';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    }
    else  if (status === 'status_invalido') {
        errorMessageDiv.innerHTML = 'estado invalido';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'red'; // Cor vermelha para erro
    } else if (status === 'sucesso-status') {
        errorMessageDiv.innerHTML = 'estado atualizado com sucesso';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.style.color = 'green'; // Cor verde para sucesso
    }
};