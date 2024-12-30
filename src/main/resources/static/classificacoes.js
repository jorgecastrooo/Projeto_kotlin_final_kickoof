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

        // Preenche a combobox com as ligas
        const leagueSelect = document.getElementById('league');
        leagueSelect.innerHTML = '<option value="">Selecione a Liga</option>'; // Limpa as opções anteriores

        nomeligas.forEach(nomeliga => {
            if (nomeliga) { // Adiciona somente se não for vazio
                leagueSelect.innerHTML += `<option value="${nomeliga}">${nomeliga}</option>`;
            }
        });

        // Seleciona automaticamente a primeira liga ao carregar a página (ou qualquer outra liga desejada)
        if (nomeligas.length > 0) {
            leagueSelect.value = nomeligas[0]; // Selecione a primeira liga na lista
            getRank(nomeligas[0]); // Chama a função para carregar a classificação dessa liga
        }

    } catch (error) {
        console.error('Erro ao carregar as ligas:', error);
    }
}

// Chama a função para preencher as ligas ao carregar a página
document.addEventListener('DOMContentLoaded', fetchLigas);

  // Evento para detectar a mudança na seleção da liga
  document.getElementById('league').addEventListener('change', function () {
    const ligaSelecionada = this.value;
    if (ligaSelecionada) {
      getRank(ligaSelecionada); // Chama a função getRank com o valor da liga selecionada
    }
  });



  async function getRank(liga) {
    try {
        console.log(`Buscando classificação para a liga: ${liga}`);

        const response = await fetch(`http://localhost:8082/rank?liga=${liga}`, {
            headers: { 'Accept': 'text/plain' }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar classificação: ${response.status}`);
        }

        const rankText = await response.text();
        console.log("Classificação recebida:", rankText);

        if (!rankText.trim()) {
            console.error('Nenhuma classificação recebida.');
            return;
        }

        // Divida as linhas e separe os dados por linha para que cada linha de dados
        // seja tratada como um objeto com chaves específicas.
        const rows = rankText
            .split("\n\n")  // Separa os times com base em duas quebras de linha
            .map(teamText => {
                const lines = teamText.split("\n").map(line => line.trim());
                const teamData = {};
                lines.forEach(line => {
                    const [key, value] = line.split(":").map(item => item.trim());
                    if (key && value) {
                        teamData[key] = value;
                    }
                });
                return teamData;
            });

        console.log("Linhas do ranking (formato de objeto):", rows);

        const tableBody = document.querySelector('#classificationTable tbody');
        console.log("Elemento tbody da tabela:", tableBody);

        tableBody.innerHTML = '';  // Limpa a tabela antes de preenchê-la

        // Agora, iteramos para adicionar as linhas à tabela
        rows.forEach((row, index) => {
            const tr = document.createElement('tr');
            console.log("Criando linha:", tr);

            tr.innerHTML = `
                <td>
                    <div class="position-number">${index + 1}
                        ${index === 0 ? `<span class="medal gold">🥇</span>` :
                          index === 1 ? `<span class="medal silver">🥈</span>` :
                          index === 2 ? `<span class="medal bronze">🥉</span>` : ''}
                    </div>
                </td>
                <td class="team-name">
                    <span>${row['Clube']}</span> <!-- Clube -->
                </td>
                <td>${row['Pontos']}</td> <!-- Jogos -->
                <td>${row['Jogos']}</td> <!-- Vitórias -->
                <td>${row['Vitórias']}</td> <!-- Empates -->
                <td>${row['Empates']}</td> <!-- Derrotas -->
                <td>${row['Derrotas']}</td> <!-- Gols Marcados -->
                <td>${row['Gols Marcados']}</td> <!-- Gols Sofridos -->
                <td>${row['Gols Sofridos']}</td> <!-- Pontos -->
            `;

            tableBody.appendChild(tr);
            console.log("Linha adicionada à tabela:", tr);
        });

    } catch (error) {
        console.error('Erro ao carregar a classificação:', error);
    }
}