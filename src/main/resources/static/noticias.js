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

  async function fetchNews() {
  try {
    const response = await fetch('http://localhost:8082/news', {
      headers: { 'Accept': 'text/plain' }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar notícias: ${response.status}`);
    }

    const newsList = await response.text(); // Recebe as notícias como texto

    // Passa as notícias para renderNews
    renderNews(newsList);
  } catch (error) {
    console.error(error);
  }
}

function renderNews(newsList) {
  const newsSection = document.getElementById('news-section');
  newsSection.innerHTML = ''; // Limpa a seção antes de renderizar

  if (newsList) {
    const newsItems = newsList.split('\n'); // Assume que cada notícia está em uma linha separada
    newsItems.forEach(news => {
      // Divide os campos da notícia por " - "
      const newsFields = news.split(' - ');
      if (newsFields.length === 3) {
        const title = newsFields[0].trim(); // Título da notícia
        const description = newsFields[1].trim(); // Descrição da notícia
        const category = newsFields[2].trim(); // Categoria da notícia

        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.setAttribute('data-category', category); // Adiciona a categoria à div

        // Renderiza o conteúdo da notícia
        newsCard.innerHTML = `
          <div class="news-title">${title}</div>
          <div class="news-content">${description}</div>
          <div class="news-category">Categoria: ${category}</div>
        `;
        newsSection.appendChild(newsCard);
      }
    });
  } else {
    newsSection.innerHTML = `<div class="news-card">Nenhuma notícia encontrada.</div>`;
  }
}

function filterNews() {
  const categoryFilter = document.getElementById('category-filter').value;
  const newsCards = document.querySelectorAll('.news-card');
  newsCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (categoryFilter === 'all' || cardCategory === categoryFilter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Inicia a busca das notícias ao carregar a página
fetchNews();

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