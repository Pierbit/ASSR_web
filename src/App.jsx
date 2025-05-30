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
    }, [selectedDay]); //

    const yesterdayDate = new Date();
    const anotherYesterdayDate = new Date();

    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    anotherYesterdayDate.setDate(anotherYesterdayDate.getDate() - 2);

    const formattedYesterday = yesterdayDate.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const formattedAnotherYesterday = anotherYesterdayDate.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    function putDate() {
        if(selectedDay === "today") {
            return <p className={"battles_dates"}>{formattedYesterday}</p>
        } else if (selectedDay === "yesterday") {
            return <p className={"battles_dates"}>{formattedAnotherYesterday}</p>
        }
    }

    return (
        <>
            <div className="main_title">
                {putDate()}
                <h1 style={{ color: "white" }}>
                    Daily ASSR battles
                </h1>
                <Form.Select
                    className={"select-day"}
                    aria-label="Select day"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                >
                    <option value="today">1 day ago</option>
                    <option value="yesterday">2 days ago</option>
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
