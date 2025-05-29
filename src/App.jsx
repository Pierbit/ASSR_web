import './assets/components_css/app.css'
import React, { useEffect, useState } from "react";
import Battle_card from './Battle_card.jsx'


function App() {

    const [battles, setBattles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBattles = async () => {
            try {
                const res = await fetch("https://assr-production.up.railway.app/api/battles/day");
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
                <h1 style={{color:"white"}}>
                    Daily ASSR battles
                </h1>
            </div>

            {loading ? (
                <p>Caricamento battaglie...</p>
            ) : (
                <div className="battle-list">
                    {battles.map((battle) => (
                        <Battle_card key={battle.id} id={battle.id} date={battle.data} rats={battle.ratti} winner={battle.vincitore} guilds={battle.gilde} secondaryguilds={battle.secondary} />
                    ))}
                </div>
            )}
        </>
    )
}

export default App
