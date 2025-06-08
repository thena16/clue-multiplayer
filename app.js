function App() {
    try {
        const [gameState, setGameState] = React.useState(null);
        const [viewMode, setViewMode] = React.useState('setup'); // setup, master, player
        const [playerId, setPlayerId] = React.useState(null);
        const [winner, setWinner] = React.useState(null);

        const createGame = (numPlayers) => {
            const newGame = createMultiplayerGame(numPlayers);
            if (newGame) {
                setGameState(newGame);
                setViewMode('master');
            }
        };

        const joinGame = (gameId) => {
            // Simular entrada no jogo
            if (gameState && gameState.gameId === gameId) {
                const availablePlayer = gameState.players.find(p => !p.joined);
                if (availablePlayer) {
                    setPlayerId(availablePlayer.id);
                    setViewMode('player');
                }
            } else {
                alert('Jogo não encontrado!');
            }
        };

        const makeGuess = (playerIdGuessing) => {
            // Simular formulário de palpite
            const suspect = prompt('Suspeito (1-6):');
            const weapon = prompt('Arma (1-6):');
            const location = prompt('Local (1-6):');
            
            if (suspect && weapon && location) {
                const guess = {
                    suspect: Number(suspect),
                    weapon: Number(weapon),
                    location: Number(location)
                };
                
                const isCorrect = checkFinalGuess(guess, gameState.crimeCards);
                if (isCorrect) {
                    setWinner(playerIdGuessing);
                    alert('Parabéns! Você venceu!');
                } else {
                    alert('Palpite incorreto!');
                }
            }
        };

        const resetGame = () => {
            setGameState(null);
            setViewMode('setup');
            setPlayerId(null);
            setWinner(null);
        };

        if (viewMode === 'setup') {
            return React.createElement(GameSetup, { 
                onCreateGame: createGame,
                onJoinGame: joinGame 
            });
        }

        if (viewMode === 'master') {
            return React.createElement(GameMaster, { 
                gameState: gameState,
                onRevealSolution: () => setWinner('master')
            });
        }

        if (viewMode === 'player' && playerId) {
            return React.createElement(PlayerView, {
                gameState: gameState,
                playerId: playerId,
                onMakeGuess: makeGuess
            });
        }

        return React.createElement('div', { className: 'min-h-screen flex items-center justify-center' },
            React.createElement('button', {
                onClick: resetGame,
                className: 'mystery-gradient text-white py-2 px-4 rounded-lg'
            }, 'Voltar ao Início')
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
