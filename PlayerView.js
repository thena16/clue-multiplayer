function PlayerView({ gameState, playerId, onMakeGuess }) {
    try {
        const [showNotes, setShowNotes] = React.useState(false);
        const player = gameState.players.find(p => p.id === playerId);

        if (!player) return null;

        const getCardType = (card) => {
            if (GAME_DATA.suspects.some(s => s.id === card.id)) return 'suspect';
            if (GAME_DATA.weapons.some(w => w.id === card.id)) return 'weapon';
            return 'location';
        };

        return (
            <div data-name="PlayerView" data-file="components/PlayerView.js" className="min-h-screen p-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{player.name}</h2>
                            <p className="text-gray-600">Código: {gameState.gameId}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Suas Cartas</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {player.cards.map((card, index) => {
                                    const cardType = getCardType(card);
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 bg-gray-100 rounded-lg"
                                        >
                                            <i className={`${card.icon} mr-3 text-lg`}></i>
                                            <span className="font-medium">{card.name}</span>
                                            <span className="ml-auto text-xs text-gray-500 capitalize">
                                                {cardType}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => setShowNotes(!showNotes)}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
                            >
                                <i className="fas fa-sticky-note mr-2"></i>
                                {showNotes ? 'Esconder' : 'Mostrar'} Anotações
                            </button>

                            <button
                                onClick={() => onMakeGuess(playerId)}
                                className="w-full mystery-gradient text-white py-2 px-4 rounded-lg font-semibold"
                            >
                                <i className="fas fa-search mr-2"></i>
                                Fazer Acusação Final
                            </button>
                        </div>
                    </div>

                    {showNotes && <NotePad />}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PlayerView error:', error);
        reportError(error);
    }
}
