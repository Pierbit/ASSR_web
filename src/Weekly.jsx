import './assets/components_css/App.css';
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Weekly() {
    const [battles, setBattles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBattles = async () => {
            try {
                const res = await fetch("https://assr-production.up.railway.app/api/battles/week");
                const data = await res.json();

                // Transform data into an array for recharts
                const formatted = Object.entries(data).map(([guild, stats]) => ({
                    guild,
                    numero_battaglie: stats.numero_battaglie,
                    vittorie: stats.vittorie
                })).sort((a, b) => b.numero_battaglie - a.numero_battaglie);

                setBattles(formatted);
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
                <h1 style={{color:"white"}}>Weekly Guild Report</h1>
            </div>

            {loading ? (
                <p>Caricamento battaglie...</p>
            ) : (
                <ResponsiveContainer width="90%" height={Math.max(500, battles.length * 40)}>
                    <BarChart layout="vertical" data={battles} margin={{ top: 20, right: 30, left: 100, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" allowDecimals={false} orientation="top"/>
                        <YAxis dataKey="guild" type="category" width={200}/>
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="top" align="center"/>
                        <Bar dataKey="numero_battaglie" fill="#8884d8" name="Battaglie" />
                        <Bar dataKey="vittorie" fill="#82ca9d" name="Vittorie" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    );
}

export default Weekly;
