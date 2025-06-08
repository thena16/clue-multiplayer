function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createMultiplayerGame(numPlayers) {
    try {
        const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const crimeCards = {
            suspect: GAME_DATA.suspects[Math.floor(Math.random() * GAME_DATA.suspects.length)],
            weapon: GAME_DATA.weapons[Math.floor(Math.random() * GAME_DATA.weapons.length)],
            location: GAME_DATA.locations[Math.floor(Math.random() * GAME_DATA.locations.length)]
        };

        const remainingCards = [
            ...GAME_DATA.suspects.filter(s => s.id !== crimeCards.suspect.id),
            ...GAME_DATA.weapons.filter(w => w.id !== crimeCards.weapon.id),
            ...GAME_DATA.locations.filter(l => l.id !== crimeCards.location.id)
        ];

        const shuffledCards = shuffleArray(remainingCards);
        const cardsPerPlayer = Math.floor(shuffledCards.length / numPlayers);
        const players = [];

        for (let i = 0; i < numPlayers; i++) {
            const startIndex = i * cardsPerPlayer;
            const endIndex = startIndex + cardsPerPlayer;
            players.push({
                id: i + 1,
                name: `Jogador ${i + 1}`,
                cards: shuffledCards.slice(startIndex, endIndex)
            });
        }

        return { gameId, crimeCards, players, numPlayers };
    } catch (error) {
        console.error('Erro ao criar jogo:', error);
        reportError(error);
        return null;
    }
}

function checkFinalGuess(guess, crimeCards) {
    try {
        return (
            guess.suspect === crimeCards.suspect.id &&
            guess.weapon === crimeCards.weapon.id &&
            guess.location === crimeCards.location.id
        );
    } catch (error) {
        console.error('Erro ao verificar palpite:', error);
        reportError(error);
        return false;
    }
}
