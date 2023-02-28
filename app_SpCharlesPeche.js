// Déclaration des variables
let scores, roundScore, activePlayer, gamePlaying;

init();

// Fonction pour initialiser le jeu
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // Initialisation des scores dans l'interface
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Masquer le dé au début du jeu
    document.querySelector('.dice').style.display = 'none';

    // Réinitialiser les classes CSS pour les joueurs
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Fonction pour changer de joueur
function nextPlayer() {
    // Réinitialiser le score ROUND et mettre à jour l'interface
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';

    // Changer le joueur actif
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Changer l'apparence des joueurs actifs dans l'interface
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Masquer le dé
    document.querySelector('.dice').style.display = 'none';
}

// Événement lorsque le joueur clique sur le bouton "Lancer"
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Générer un nombre aléatoire entre 1 et 6
        let dice = Math.floor(Math.random() * 6) + 1;

        // Afficher le résultat du dé dans l'interface
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'ressources/images/dice-' + dice + '.png';

        // Ajouter le résultat au score ROUND si le dé n'a pas affiché 1
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // Changer de joueur si le dé affiche 1
            nextPlayer();
        }
    }
});

// Événement lorsque le joueur clique sur le bouton "Hold"
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Ajouter le score ROUND au score GLOBAL
        scores[activePlayer] += roundScore;}

        // Mettre à jour l'interface
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Vérifier si le joueur a gagné le jeu
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        }else {
            // Changer de joueur si le joueur n'a pas gagné le jeu
            nextPlayer();
        }
        });

// Événement lorsque le joueur clique sur le bouton "New game"
document.querySelector('.btn-new').addEventListener('click', init);
           
