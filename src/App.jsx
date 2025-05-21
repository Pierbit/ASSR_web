import './assets/components_css/App.css'
import React, { useEffect, useState } from "react";


function App() {

    const [battles, setBattles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBattles = async () => {
            try {
                const res = await fetch("https://assr-production.up.railway.app/api/battles");
                const data = await res.json();
                setBattles(data);
            } catch (error) {
                console.error("Errore nel fetch delle battaglie:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBattles();
    }, []);

    return (
        <>
            <div className="main_title">
                <h1>
                    Albion Small Scale Reporter
                </h1>
            </div>

            {loading ? (
                <p>Caricamento battaglie...</p>
            ) : (
                <div className="battle-list">
                    {battles.map((battle) => (
                        <div key={battle.id} className="battle-card">
                            <h2>Battle ID: {battle.id}</h2>
                            <p><strong>Vincitore:</strong> {battle.vincitore}</p>
                            <p><strong>Ratti:</strong> {battle.ratti}cazzi</p>
                            <div className="guilds">
                                {battle.gilde.map((guild, index) => (
                                    <div key={index} className="guild-card">
                                        <h3>{guild.nome} [{guild.ally}]</h3>
                                        <p>Players: {guild.players}</p>
                                        <p>Kills: {guild.kills}</p>
                                        <p>Deaths: {guild.deaths}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default App
