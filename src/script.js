let players = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

// Inicialização
window.onload = function() {
    loadPlayers();
    displayPlayers();

    document.getElementById('playerForm').addEventListener('submit', addPlayer); 
    document.getElementById('playerList').addEventListener('click', handlePlayerListClick);
    
    // filtro por clube
    document.querySelector(".filtroPlayer").addEventListener("click", () => {
        const clube = prompt("Digite o nome do clube para filtrar:");
        if (clube) {
            filterPlayersByClub(clube);
        }
    });    

    // resetar filtro por clube
    document.querySelector(".resetFiltro").addEventListener("click", () => {
        displayPlayers();
    });

    // busca por nome ou posição
    document.getElementById("searchBtn").addEventListener("click", () => {
        const query = document.getElementById("searchInput").value.trim();
        if (query) {
            searchPlayers(query);
        }
    });

    // resetar busca
    document.getElementById("resetBtn").addEventListener("click", () => {
        displayPlayers();
        document.getElementById("searchInput").value = "";
    });

    // ordenação
    document.getElementById("sortByName").addEventListener("click", () => {
        sortPlayersByName();
    });

    document.getElementById("sortByPosition").addEventListener("click", () => {
        sortPlayersByPosition();
    });
};



// ---------- Funções Auxiliares ----------

// Função para lidar com cliques na lista de players
function handlePlayerListClick(event) {
    const clickedElement = event.target.closest("button"); // garante que pega o botão
    if (!clickedElement) return;

    const action = clickedElement.dataset.action;
    const index = clickedElement.dataset.index;

    if (action === "edit") {
        editPlayer(index);
    } else if (action === "delete") {
        deletePlayer(index);
    } else if (action === "favorite") {
        favoritePlayer(index);
    }
}

// Função para salvar no LocalStorage
function savePlayers() {
    localStorage.setItem("players", JSON.stringify(players));
}
// Função para carregar os players do LocalStorage
function loadPlayers() {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
    }
}

// CREATE
function addPlayer(event) {
    event.preventDefault();
    
    const playerImage = document.getElementById('playerImage').value;
    const playerName = document.getElementById('playerName').value;
    const playerClub = document.getElementById('playerClub').value;
    const playerPosition = document.getElementById('playerPosition').value;
    const playerGoals = document.getElementById('playerGoals').value;
    const playerAssists = document.getElementById('playerAssists').value;
    const playerGames = document.getElementById('playerGames').value;

    if (!playerImage || !playerName || !playerClub || !playerPosition || !playerGoals || !playerAssists || !playerGames) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }


    const player = { 
        foto: playerImage, 
        nome: playerName,
        clube: playerClub,
        posicao: playerPosition, 
        gols: playerGoals,
        assistencias: playerAssists,
        jogos: playerGames
    };
    
    players.unshift(player);
    savePlayers(); // salva no localStorage
    
    document.getElementById('playerForm').reset();
    displayPlayers();

    alert('Jogadora criada com sucesso')
}

// READ
function displayPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    players.forEach((pegaPlayer, index) => {
            const playerElement = document.createElement('div');
            playerElement.classList.add('card-player');
  
            playerElement.innerHTML = `
                <button id="favorito" data-action="favorite" data-index="${index}"><i class="fa-solid fa-star ${pegaPlayer.favorita ? 'favoritado' : ''}"></i></button>
                <p>${pegaPlayer.foto ? `<img src="${pegaPlayer.foto}" alt="Imagem do player" style="max-width:150px;">` : ""}</p>
                <p><em>Nome: ${pegaPlayer.nome}</em></p>
                <p><em>Clube: ${pegaPlayer.clube}</em></p>
                <p><em>Posição: ${pegaPlayer.posicao}</em></p>
                <p><em>Gols: ${pegaPlayer.gols}</em></p>
                <p><em>Assistências: ${pegaPlayer.assistencias}</em></p>
                <p><em>Jogos: ${pegaPlayer.jogos}</em></p>
                <button data-action="edit" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                <button data-action="delete" data-index="${index}"><i class="fa-solid fa-eraser"></i> Apagar</button>`;
               
            playerList.append(playerElement);
        });
}

//UPDATE
function editPlayer(index) {
    const novaFoto = prompt("Editar foto:", players[index].foto);
    if (novaFoto !== null) {
        players[index].foto = novaFoto;
        savePlayers();
        displayPlayers();
    }

    const novoNome = prompt("Editar nome:", players[index].nome);
    if (novoNome !== null) {
        players[index].nome = novoNome;
        savePlayers();
        displayPlayers();
    }

    const novoClube = prompt("Editar clube:", players[index].clube);
    if (novoClube !== null) {
        players[index].clube = novoClube;
        savePlayers();
        displayPlayers();
    }
    
    const novaPosicao = prompt("Editar posição:", players[index].posicao);
    if (novaPosicao !== null) {
        players[index].posicao = novaPosicao;
        savePlayers();
        displayPlayers();
    }

    const novoGol = prompt("Editar gols:", players[index].gols);
    if (novoGol !== null) {
        players[index].gols = novoGol;
        savePlayers();
        displayPlayers();
    }

    const novaAssistencia = prompt("Editar assistências:", players[index].assistencias);
    if (novaAssistencia !== null) {
        players[index].assistencias = novaAssistencia;
        savePlayers();
        displayPlayers();
    }

    const novosJogos = prompt("Editar jogos:", players[index].jogos);
    if (novosJogos !== null) {
        players[index].jogos = novosJogos;
        savePlayers();
        displayPlayers();
    }

    alert('Jogadora editada com sucesso')
}
//DELETE
function deletePlayer(index) {
    const confirmar = confirm("Tem certeza que deseja apagar essa jogadora?");
    if (confirmar) {
        players.splice(index, 1);
        savePlayers();
        displayPlayers();
    }
    alert('Jogadora removida com sucesso!')
}

function favoritePlayer(index) {
    const confirmar = confirm("Tem certeza que deseja favoritar essa jogadora?");
    if (confirmar) {
        players[index].favorita = !players[index].favorita;  
    }
    savePlayers();
    displayPlayers();
}

function filterPlayersByClub(clube) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    // filtra jogadoras do clube escolhido
    const filteredPlayers = players.filter(player => 
        player.clube.toLowerCase() === clube.toLowerCase()
    );

    if (filteredPlayers.length === 0) {
        playerList.innerHTML = `<p>Nenhuma jogadora encontrada para o clube "${clube}".</p>`;
        return;
    }

    // renderiza apenas as filtradas
    filteredPlayers.forEach((pegaPlayer, index) => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('card-player');

        playerElement.innerHTML = `
            <button id="favorito" data-action="favorite" data-index="${index}"><i class="fa-solid fa-star ${pegaPlayer.favorita ? 'favoritado' : ''}"></i></button>
            <p>${pegaPlayer.foto ? `<img src="${pegaPlayer.foto}" alt="Imagem do player" style="max-width:150px;">` : ""}</p>
            <p><em>Nome: ${pegaPlayer.nome}</em></p>
            <p><em>Clube: ${pegaPlayer.clube}</em></p>
            <p><em>Posição: ${pegaPlayer.posicao}</em></p>
            <p><em>Gols: ${pegaPlayer.gols}</em></p>
            <p><em>Assistências: ${pegaPlayer.assistencias}</em></p>
            <p><em>Jogos: ${pegaPlayer.jogos}</em></p>
            <button data-action="edit" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
            <button data-action="delete" data-index="${index}"><i class="fa-solid fa-eraser"></i> Apagar</button>`;
           
        playerList.append(playerElement);
    });
}

function searchPlayers(query) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    const filteredPlayers = players.filter(player =>
        player.nome.toLowerCase().includes(query.toLowerCase()) ||
        player.posicao.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredPlayers.length === 0) {
        playerList.innerHTML = `<p>Nenhuma jogadora encontrada para "${query}".</p>`;
        return;
    }

    filteredPlayers.forEach((pegaPlayer, index) => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('card-player');

        playerElement.innerHTML = `
            <button id="favorito" data-action="favorite" data-index="${index}"><i class="fa-solid fa-star ${pegaPlayer.favorita ? 'favoritado' : ''}"></i></button>
            <p>${pegaPlayer.foto ? `<img src="${pegaPlayer.foto}" alt="Imagem do player" style="max-width:150px;">` : ""}</p>
            <p><em>Nome: ${pegaPlayer.nome}</em></p>
            <p><em>Clube: ${pegaPlayer.clube}</em></p>
            <p><em>Posição: ${pegaPlayer.posicao}</em></p>
            <p><em>Gols: ${pegaPlayer.gols}</em></p>
            <p><em>Assistências: ${pegaPlayer.assistencias}</em></p>
            <p><em>Jogos: ${pegaPlayer.jogos}</em></p>
            <button data-action="edit" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
            <button data-action="delete" data-index="${index}"><i class="fa-solid fa-eraser"></i> Apagar</button>`;
           
        playerList.append(playerElement);
    });
}

function sortPlayersByName() {
    players.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    savePlayers();
    displayPlayers();
}

function sortPlayersByPosition() {
    players.sort((a, b) => a.posicao.localeCompare(b.posicao, 'pt-BR'));
    savePlayers();
    displayPlayers();
}
