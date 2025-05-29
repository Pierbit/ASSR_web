import './assets/components_css/guild_card.css'

function Guild_card({ name, ally, players, kills, deaths, secondaryguilds }) {

    return (
        <div className="guild-card">
            <h3 className="guild-name">{name} <span className="guild-ally">[{ally}]</span></h3>
            <div className="guild-stats">
                <p>👥 Players: {players}</p>
                <p>⚔️ Kills: {kills}</p>
                <p>💀 Deaths: {deaths}</p>
                {secondaryguilds && secondaryguilds.length > 0 && (
                    <div className="secondary-guilds">
                            <p>🔗 Secondary Guilds:</p>
                        <ul>
                            {secondaryguilds.map((g, i) => (
                                <li key={i}>{g.nome} with {g.players} players</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Guild_card;
