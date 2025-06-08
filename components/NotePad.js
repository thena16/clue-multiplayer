function NotePad() {
    try {
        const [notes, setNotes] = React.useState({
            suspects: {},
            weapons: {},
            locations: {}
        });

        const toggleNote = (category, id, status) => {
            setNotes(prev => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    [id]: status
                }
            }));
        };

        const getStatusIcon = (status) => {
            if (status === 'has') return 'fas fa-check text-green-500';
            if (status === 'not') return 'fas fa-times text-red-500';
            return 'fas fa-question text-gray-400';
        };

        const renderCategory = (title, items, category) => (
            <div className="mb-4">
                <h4 className="font-semibold mb-2">{title}</h4>
                <div className="space-y-1">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{item.name}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toggleNote(category, item.id, 
                                        notes[category][item.id] === 'has' ? '' : 'has')}
                                    className="p-1"
                                >
                                    <i className={getStatusIcon(notes[category][item.id])}></i>
                                </button>
                                <button
                                    onClick={() => toggleNote(category, item.id, 
                                        notes[category][item.id] === 'not' ? '' : 'not')}
                                    className="p-1"
                                >
                                    <i className="fas fa-times text-red-400"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

        return (
            <div data-name="NotePad" data-file="components/NotePad.js" className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                    <i className="fas fa-sticky-note mr-2"></i>
                    Anotações
                </h3>
                
                {renderCategory('Suspeitos', GAME_DATA.suspects, 'suspects')}
                {renderCategory('Armas', GAME_DATA.weapons, 'weapons')}
                {renderCategory('Lugares', GAME_DATA.locations, 'locations')}
            </div>
        );
    } catch (error) {
        console.error('NotePad error:', error);
        reportError(error);
    }
}
