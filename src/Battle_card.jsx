import './assets/components_css/battle_card.css'
import Guild_card from './Guild_card.jsx'
import {useState, useEffect} from 'react';
import React from "react";
import Button from 'react-bootstrap/Button';
import pvp_fame_icon from './assets/components_images/pvp_fame.png'

function Battle_card({id, date, winner, rats, guilds, secondaryguilds, totalFame}) {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setMobile(window.innerWidth < 600);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    function ratteria() {
        if (rats >= 0 && rats <= 5) {
            return <p><span style={{fontWeight: "bold"}}>Rats:</span> <span style={{color: "#0081cf"}}>{rats}</span></p>;
        } else if (rats > 5 && rats <= 10) {
            return <p><span style={{fontWeight: "bold"}}>Rats:</span> <span style={{color: "#ffc75f"}}>{rats}</span></p>;
        } else {
            return <p><span style={{fontWeight: "bold"}}>Rats:</span> <span style={{color: "#cb0000"}}>{rats}</span></p>;
        }
    }

    function vincitore(nome) {
        return nome === winner ?
            <span style={{color:"#007700"}}>{nome}</span> :
            <span style={{color:"#cb0000"}}>{nome}</span>;
    }

    function renderGuildNames() {
        return (
            <span style={{ fontWeight: "bold" }}>
                {guilds.map((guild, index) => (
                    <React.Fragment key={guild.nome}>
                        {vincitore(guild.nome)}
                        {index < guilds.length - 1 && (
                            <span className="vs-card-inline"> VS </span>
                        )}
                    </React.Fragment>
                ))}
            </span>
        );
    }

    function famaTotale() {
        let color = "#0081cf";
        if (totalFame > 1000000 && totalFame < 5000000) color = "#ffc75f";
        else if (totalFame >= 5000000) color = "#cb0000";

        return (
            <h2 className="battle_id_container pvpfame">
                <img className="pvp_fame_icon" src={pvp_fame_icon} alt="pvpfame"/>
                <span style={{color}}>
                    {totalFame.toLocaleString('de-DE')}
                </span>
            </h2>
        );
    }

    return (
        <div className="card_main">
            <div className="card_title">
                <div className="left">
                    {isMobile ? (
                        <h2 className="battle_id_container mobile-guild-names">
                            {renderGuildNames()}
                        </h2>
                    ) : (
                        <h2 className="battle_id_container">Battle ID: <a className="battle_link" href={`https://eu.albionbattles.com/battles/${id}`} target="_blank" rel="noopener noreferrer">
                            {id} 🔗
                        </a></h2>
                    )}
                    {famaTotale()}
                </div>

                {!isMobile && (
                    <div className="center">
                        <h2 className="battle_title_container">
                            {renderGuildNames()}
                        </h2>
                    </div>
                )}

                <div className="right">
                    <Button
                        variant="outline-dark"
                        className="toggle_button"
                        onClick={() => setExpanded(prev => !prev)}
                    >
                        {expanded ? '▲ Collapse' : '▼ Expand'}
                    </Button>
                </div>
            </div>

            {expanded && (
                <div className="card_content_container">
                    <div className="card_stats">
                        <p style={{fontWeight: "bold"}} className="mobile_battle_id">
                            Battle ID: <a className="battle_link" href={`https://eu.albionbattles.com/battles/${id}`} target="_blank" rel="noopener noreferrer">
                            {id} 🔗
                        </a>
                        </p>
                        <p>
                            <span style={{fontWeight: "bold"}}>Data: </span>
                            <span style={{color: "#0081cf"}}>
                                {new Date(date.replace(/\.\d+Z$/, 'Z')).toLocaleString([], {
                                    dateStyle: 'short',
                                    timeStyle: 'short'
                                })}
                            </span>
                        </p>
                        <p>
                            <span style={{fontWeight: "bold"}}>Winner: </span>
                            <span style={{color: "green"}}>{winner}</span>
                        </p>
                        {ratteria()}
                    </div>

                    <div className="card_guilds">
                        {guilds.map((guild, index) => (
                            <React.Fragment key={guild.nome}>
                                <Guild_card
                                    name={guild.nome}
                                    ally={guild.ally}
                                    deaths={guild.deaths}
                                    kills={guild.kills}
                                    players={guild.players}
                                    secondaryguilds={secondaryguilds.filter(g => g.ally === guild.ally)}
                                />
                                {index < guilds.length - 1 && (
                                    <div className="vs-card">
                                        <p style={{margin:"0"}}>VS</p>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Battle_card;