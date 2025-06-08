function GameMaster({ gameState, onRevealSolution }) {
    try {
        const [showSolution, setShowSolution] = React.useState(false);

        return (
            <div data-name="GameMaster" data-file="components/GameMaster.js" className="min-h-screen p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Mestre do Jogo</h2>
                            <p className="text-gray-600">Código: {gameState.gameId}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Jogadores</h3>
                                {gameState.players.map(player => (
                                    <div key={player.id} className="p-3 bg-gray-100 rounded-lg mb-2">
                                        <div className="font-medium">{player.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {player.cards.length} cartas
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Instruções</h3>
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p>• Cada jogador vê suas cartas no celular</p>
                                    <p>• Façam perguntas entre vocês</p>
                                    <p>• Quem tiver a carta deve mostrar</p>
                                    <p>• Anotem as informações</p>
                                    <p>• Façam a acusação final quando souberem</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <button
                                onClick={() => setShowSolution(!showSolution)}
                                className="mystery-gradient text-white py-2 px-6 rounded-lg font-semibold"
                            >
                                {showSolution ? 'Esconder' : 'Ver'} Solução
                            </button>

                            {showSolution && (
                                <div className="crime-card rounded-xl p-6 text-white">
                                    <h3 className="text-xl font-bold mb-4">🔍 Solução do Crime</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center">
                                            <i className={`${gameState.crimeCards.suspect.icon} mr-3`}></i>
                                            <span>{gameState.crimeCards.suspect.name}</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <i className={`${gameState.crimeCards.weapon.icon} mr-3`}></i>
                                            <span>{gameState.crimeCards.weapon.name}</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <i className={`${gameState.crimeCards.location.icon} mr-3`}></i>
                                            <span>{gameState.crimeCards.location.name}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameMaster error:', error);
        reportError(error);
    }
}
