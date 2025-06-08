function GameSetup({ onCreateGame, onJoinGame }) {
    try {
        const [numPlayers, setNumPlayers] = React.useState(3);
        const [gameId, setGameId] = React.useState('');
        const [showJoin, setShowJoin] = React.useState(false);

        const handleCreateGame = () => {
            if (numPlayers >= 2 && numPlayers <= 6) {
                onCreateGame(numPlayers);
            }
        };

        const handleJoinGame = () => {
            if (gameId.trim()) {
                onJoinGame(gameId.toUpperCase());
            }
        };

        return (
            <div data-name="GameSetup" data-file="components/GameSetup.js" 
                 className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="game-title text-4xl font-bold text-gray-800 mb-2">
                            <i className="fas fa-search mr-3"></i>
                            CLUE
                        </h1>
                        <p className="text-gray-600">Jogo Multiplayer</p>
                    </div>

                    {!showJoin ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de Jogadores
                                </label>
                                <select
                                    value={numPlayers}
                                    onChange={(e) => setNumPlayers(Number(e.target.value))}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                >
                                    {[2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num} jogadores</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={handleCreateGame}
                                className="w-full mystery-gradient text-white py-3 px-6 rounded-lg font-semibold"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Criar Jogo
                            </button>

                            <button
                                onClick={() => setShowJoin(true)}
                                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold"
                            >
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                Entrar no Jogo
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Código do Jogo
                                </label>
                                <input
                                    type="text"
                                    value={gameId}
                                    onChange={(e) => setGameId(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Digite o código"
                                />
                            </div>

                            <button
                                onClick={handleJoinGame}
                                className="w-full mystery-gradient text-white py-3 px-6 rounded-lg font-semibold"
                            >
                                Entrar
                            </button>

                            <button
                                onClick={() => setShowJoin(false)}
                                className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg"
                            >
                                Voltar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameSetup error:', error);
        reportError(error);
    }
}
