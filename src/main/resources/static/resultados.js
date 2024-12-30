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

        async function filterResults() {
    const dateFilter = document.getElementById('date-filter').value;

    // Conjunto para armazenar jogadores com cartões amarelos (evitar repetidos)
    let yellowCardPlayersSet = new Set();

    try {
        const response = await fetch(`/games-by-date?date=${dateFilter}`);
        const ligas = await response.text(); // Recebe os jogos como texto

        console.log(ligas); // Exibe os resultados no console

        // Exibir os resultados no HTML
        const resultsContainer = document.getElementById('results-section');
        resultsContainer.innerHTML = ''; // Limpa resultados anteriores

        const games = ligas.split('\n\n'); // Divide os resultados em jogos separados
        games.forEach(game => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('result-card');

            // Estrutura de cada jogo
            const gameDetails = game.split('\n').map(line => line.trim());

            // Verificando se os detalhes estão completos
            if (gameDetails.length < 11) {
                console.error('Formato de dados inválido:', game);
                return; // Pula o jogo se não tiver todos os dados necessários
            }

            const timeMatch = gameDetails[3].replace("Hora: ", "").trim();
            const statusMatch = gameDetails[4]?.split(":")[1]?.trim();
            const teamNames = gameDetails[1].split(":")[1]?.trim().split("VS") || ["Time A", "Time B"];
            const scores = gameDetails[5].split(":")[1]?.trim().split(" ") || ["0", "0"];
            const scores_2 = gameDetails[6].split(":")[1]?.trim().split(" ") || ["0", "0"];

            const teamA = teamNames[0];
            const teamB = teamNames[1];

            const scoreA = scores[0];
            const scoreB = scores_2[0];

            // Processar gols e autogols
            const goalsTeamA = gameDetails[5]?.split(":")[1]?.trim()
                .replace(/^\d+\s?/, "") // Remove os números iniciais e o espaço
                .replace(/\(/, "") // Remove o primeiro parêntese
                .replace(/\)$/, "") // Remove o último parêntese
                .split(",") || [];

            const goalsTeamB = gameDetails[6]?.split(":")[1]?.trim()
                .replace(/^\d+\s?/, "") // Remove os números iniciais e o espaço
                .replace(/\(/, "") // Remove o primeiro parêntese
                .replace(/\)$/, "") // Remove o último parêntese
                .split(",") || [];

            // Função para formatar gols e adicionar o ícone de gol
            const formatGoals = (goals) => {
                if (!goals || goals.length === 0 || goals[0] === "") {
                    return '';  // Se não houver gols, retorna uma string vazia
                }
                return goals
                    .map(goal => `<span>${goal}</span>`)  // Apenas os gols, sem o ícone, já que o ícone será adicionado abaixo
                    .join("<br>");  // Junta todos os gols com quebras de linha
            };

            // Adicionar ícone de gol se houver gols
            const addGoalIcon = (goals) => {
                if (!goals || goals.length === 0 || goals[0] === "") {
                    return '';  // Não exibe o ícone de gol se não houver gols ou se for "0 ()"
                }
                return goals.map(goal => `<span>⚽ ${goal}</span>`).join("<br>");
            };

            // Formatação dos gols para os dois times
            const formattedGoalsA = addGoalIcon(goalsTeamA);
            const formattedGoalsB = addGoalIcon(goalsTeamB);

            // Função para formatar cartões
            const formatCards = (cards, cardType, team) => {
    if (!cards || cards === "") {
        return ""; // Caso não haja cartões
    }

    // Definindo o ícone de cartão amarelo e vermelho com tamanhos maiores
    let cardIcon = cardType === "yellow"
        ? '<span style="color: yellow; font-size: 20px;">&#9724;</span>' // Ícone de cartão amarelo maior
        : '<span style="color: red; font-size: 20px;">&#9724;</span>';  // Ícone de cartão vermelho maior

    const formattedCards = cards
        .split(",")
        .map(card => {
            const trimmedCard = card.trim();
            // Verifica se o jogador já recebeu cartão amarelo antes de adicionar
            // Modificação na parte onde você cria o ícone de cartão modificado (metade amarelo, metade vermelho)
            if (cardType === "yellow" && trimmedCard) {
                if (yellowCardPlayersSet.has(trimmedCard)) {
                    console.log(`Jogador repetido com cartão amarelo: ${trimmedCard}`);
                    // Ícone de cartão modificado (metade amarelo e metade vermelho, quadrado)
                    cardIcon = '<span style="background: linear-gradient(to right, yellow 50%, red 50%); display: inline-block; width: 13px; height: 12px; border-radius: 0px;"></span>';
                    return `<span>${cardIcon} ${trimmedCard}</span>`; // Retorna o ícone de cartão modificado
                } else {
                    yellowCardPlayersSet.add(trimmedCard); // Adiciona o jogador ao conjunto
                }
            }

            return `<span>${cardIcon} ${trimmedCard}</span>`;
        })
        .join("<br>");

    return formattedCards;
};


            const yellowCardsTeamA = gameDetails[7]?.split(":")[1]?.trim();
            const redCardsTeamA = gameDetails[8]?.split(":")[1]?.trim();
            const yellowCardsTeamB = gameDetails[9]?.split(":")[1]?.trim();
            const redCardsTeamB = gameDetails[10]?.split(":")[1]?.trim();

            const yellowCardsA = formatCards(yellowCardsTeamA, "yellow", teamA);
            const redCardsA = formatCards(redCardsTeamA, "red", teamA);
            const yellowCardsB = formatCards(yellowCardsTeamB, "yellow", teamB);
            const redCardsB = formatCards(redCardsTeamB, "red", teamB);

            // Criar o conteúdo do card do jogo
            const gameCardContent = `
                <div class="result-team">
                    <span class="team-name">${teamA}</span>
                    <span class="team-score">${scoreA}</span>
                    <div class="team-details">
                        ${formattedGoalsA}
                        <br>
                        ${yellowCardsA}
                         <br>
                        ${redCardsA}
                    </div>
                </div>
                <div class="match-details">
                    <span class="match-time">${timeMatch}</span>
                    <span class="match-status">${statusMatch}</span>
                </div>
                <div class="result-team">
                    <span class="team-name">${teamB}</span>
                    <span class="team-score">${scoreB}</span>
                    <div class="team-details">
                        ${formattedGoalsB}
                        <br>
                        ${yellowCardsB}
                         <br>
                        ${redCardsB}
                    </div>
                </div>
            `;

            resultCard.innerHTML = gameCardContent;
            resultsContainer.appendChild(resultCard); // Adiciona o card ao container
        });

        // Após o processamento de todos os jogos, exibe os jogadores que receberam cartões amarelos
        console.log("Jogadores com cartões amarelos (sem repetidos):");
        yellowCardPlayersSet.forEach(player => {
            console.log(player);
        });

    } catch (error) {
        console.error('Erro ao carregar os jogos:', error);
    }
}


// Definir a data de hoje no campo de filtro
window.onload = function() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayDate = yyyy + '-' + mm + '-' + dd;

    document.getElementById('date-filter').value = todayDate;
    filterResults(); // Exibir os resultados do dia atual
};


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

