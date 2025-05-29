import './assets/components_css/app.css'
import React, {useEffect, useState} from "react";
import Battle_card from './Battle_card.jsx'
import Form from 'react-bootstrap/Form';


function App() {
    const [battles, setBattles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState("today");

    async function fetchBattles(day) {
        try {
            setLoading(true);
            const res = await fetch(`https://assr-production.up.railway.app/api/battles/day?day=${day}`);
            const data = await res.json();
            setBattles(data);
        } catch (error) {
            console.error("Errore nel fetch delle battaglie:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBattles(selectedDay);
    }, [selectedDay]); // <-- richiama solo quando selectedDay cambia

    return (
        <>
            <div className="main_title">
                <h1 style={{ color: "white" }}>
                    Daily ASSR battles
                </h1>
                <Form.Select
                    className={"select-day"}
                    aria-label="Select day"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                </Form.Select>
            </div>

            {loading ? (
                <p>Caricamento battaglie...</p>
            ) : (
                <div className="battle-list">
                    {battles.map((battle) => (
                        <Battle_card
                            key={battle.id}
                            id={battle.id}
                            date={battle.data}
                            rats={battle.ratti}
                            winner={battle.vincitore}
                            guilds={battle.gilde}
                            secondaryguilds={battle.secondary}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default App;
