function GuessForm({ onGuess }) {
    try {
        const [guess, setGuess] = React.useState({
            suspect: '',
            weapon: '',
            location: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            if (guess.suspect && guess.weapon && guess.location) {
                onGuess({
                    suspect: Number(guess.suspect),
                    weapon: Number(guess.weapon),
                    location: Number(guess.location)
                });
            } else {
                alert('Por favor, selecione um suspeito, uma arma e um local!');
            }
        };

        return (
            <div data-name="GuessForm" data-file="components/GuessForm.js" className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    <i className="fas fa-question-circle mr-2"></i>
                    Fazer Palpite
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Suspeito
                        </label>
                        <select
                            value={guess.suspect}
                            onChange={(e) => setGuess({...guess, suspect: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Selecione...</option>
                            {GAME_DATA.suspects.map(suspect => (
                                <option key={suspect.id} value={suspect.id}>
                                    {suspect.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Arma
                        </label>
                        <select
                            value={guess.weapon}
                            onChange={(e) => setGuess({...guess, weapon: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Selecione...</option>
                            {GAME_DATA.weapons.map(weapon => (
                                <option key={weapon.id} value={weapon.id}>
                                    {weapon.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local
                        </label>
                        <select
                            value={guess.location}
                            onChange={(e) => setGuess({...guess, location: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Selecione...</option>
                            {GAME_DATA.locations.map(location => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full mystery-gradient text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        <i className="fas fa-search mr-2"></i>
                        Fazer Acusação
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('Erro no GuessForm:', error);
        reportError(error);
    }
}
