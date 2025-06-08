function PlayerHand({ player }) {
    try {
        const getCardType = (card) => {
            if (GAME_DATA.suspects.some(s => s.id === card.id)) return 'suspect';
            if (GAME_DATA.weapons.some(w => w.id === card.id)) return 'weapon';
            return 'location';
        };

        const getCardColor = (card, type) => {
            if (type === 'suspect') return card.color || '#6B7280';
            if (type === 'weapon') return '#EF4444';
            return '#10B981';
        };

        return (
            <div data-name="PlayerHand" data-file="components/PlayerHand.js" className="player-card rounded-xl p-4 text-white">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <i className="fas fa-user mr-2"></i>
                    {player.name}
                    <span className="ml-auto text-sm opacity-75">
                        {player.cards.length} cartas
                    </span>
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {player.cards.map((card, index) => {
                        const cardType = getCardType(card);
                        const cardColor = getCardColor(card, cardType);
                        
                        return (
                            <div
                                key={index}
                                className="bg-white bg-opacity-20 rounded-lg p-3 text-center card-hover"
                                style={{ borderLeft: `4px solid ${cardColor}` }}
                            >
                                <i className={`${card.icon} text-lg mb-1`}></i>
                                <p className="text-xs font-medium">{card.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no PlayerHand:', error);
        reportError(error);
    }
}
