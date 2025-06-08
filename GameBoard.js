function GameBoard({ gameState, onMakeGuess, onNewGame }) {
    try {
        const [showSolution, setShowSolution] = React.useState(false);
        const [gameWon, setGameWon] = React.useState(false);

        const handleGuess = (guess) => {
            const isCorrect = checkGuess(guess, gameState.crimeCards);
            if (isCorrect) {
                setGameWon(true);
                setShowSolution(true);
            } else {
                alert('Palpite incorreto! Tente novamente.');
            }
        };

        return (
            <div data-name="GameBoard" data-file="components/GameBoard.js" className="min-h-screen p-4">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="game-title text-5xl font-bold text-white mb-2">CLUE</h1>
                        <p className="text-gray-300">Resolva o mistério do crime!</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Jogadores */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                <i className="fas fa-users mr-2"></i>
                                Jogadores
                            </h2>
                            <div className="grid gap-4">
                                {gameState.players.map(player => (
                                    <PlayerHand key={player.id} player={player} />
                                ))}
                            </div>
                        </div>

                        {/* Painel de Palpite */}
                        <div>
                            <GuessForm onGuess={handleGuess} />
                            
                            {/* Solução (se revelada) */}
                            {showSolution && (
                                <div className="mt-6 crime-card rounded-xl p-6 text-white">
                                    <h3 className="text-xl font-bold mb-4 text-center">
                                        {gameWon ? '🎉 Parabéns! 🎉' : '🔍 Solução'}
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <i className={`${gameState.crimeCards.suspect.icon} mr-3`}></i>
                                            <span>{gameState.crimeCards.suspect.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <i className={`${gameState.crimeCards.weapon.icon} mr-3`}></i>
                                            <span>{gameState.crimeCards.weapon.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <i className={`${gameState.crimeCards.location.icon} mr-3`}></i>
                                            <span>{gameState.crimeCards.location.name}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={onNewGame}
                                className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Novo Jogo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no GameBoard:', error);
        reportError(error);
    }
}
