import './assets/components_css/app.css';
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Weekly() {

    const [battles, setBattles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [marginFlag, setMarginFlag] = useState(100);
    const [widthFlag, setWidthFlag] = useState(150);

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

                console.log(formatted.length);
                setBattles(formatted);
            } catch (error) {
                console.error("Errore nel fetch delle battaglie:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBattles();
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            if(window.innerWidth < 768){
                setMarginFlag(15);
                setWidthFlag(100);
            }else{
                setMarginFlag(100);
                setWidthFlag(150);
            }
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <>
            <div className="main_title">
                <h1 style={{color:"white"}}>Weekly Guild Report</h1>
            </div>

            {loading ? (
                <p>Caricamento battaglie...</p>
            ) : (
                <ResponsiveContainer width="90%" height={Math.max(500, battles.length * 50)}>
                    <BarChart layout="vertical" data={battles} margin={{ top: 20, right: 10, left: marginFlag, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" allowDecimals={false} orientation="top"/>
                        <YAxis dataKey="guild" type="category" width={widthFlag}/>
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="top" align="center"/>
                        <Bar dataKey="numero_battaglie" fill="#AF47D2" name="Battaglie" />
                        <Bar dataKey="vittorie" fill="#FFDB00" name="Vittorie" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    );
}

export default Weekly;
