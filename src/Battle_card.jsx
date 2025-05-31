import './assets/components_css/battle_card.css'
import Guild_card from './Guild_card.jsx'
import {useState} from 'react';
import React from "react";
import Button from 'react-bootstrap/Button';

function Battle_card({id, date, winner, rats, guilds, secondaryguilds, totalFame, totalKills}) {
    const [expanded, setExpanded] = useState(false);

    function ratteria() {
        if (rats >= 0 && rats <= 5) {
            return <p><span style={{fontWeight: "bold"}}>Rats:</span> <span style={{color: "#0081cf"}}>{rats}</span>
            </p>;
        } else if (rats > 5 && rats <= 10) {
            return <p><span style={{fontWeight: "bold"}}>Rats:</span> <span style={{color: "#ffc75f"}}>{rats}</span>
            </p>;
        } else {
            return <p><span style={{fontWeight: "bold"}}>Rats:</span> <span style={{color: "red"}}>{rats}</span></p>;
        }
    }

    function vincitore(nome){
        if(nome === winner){
            return <span style={{color:"#007700"}}>{nome}</span>
        }else{
            return <span style={{color:"#cb0000"}}>{nome}</span>
        }
    }

    function famaTotale(){
        if(totalFame < 1000000){
            return <h2 className="battle_id_container">Total Fame: <span style={{color:"#0081cf"}}>{totalFame.toLocaleString('de-DE')}</span></h2>
        }else if(totalFame > 1000000 && totalFame < 5000000){
            return <h2 className="battle_id_container">Total Fame: <span style={{color:"#ffc75f"}}>{totalFame.toLocaleString('de-DE')}</span></h2>
        } else if(totalFame > 5000000 && totalFame < 50000000){
            return <h2 className="battle_id_container">Total Fame: <span style={{color:"red"}}>{totalFame.toLocaleString('de-DE')}</span></h2>
        } else{
            return <h2 className="battle_id_container">Total Fame: <span style={{color:"red"}}>{totalFame}</span></h2>
        }
    }

    return (
        <div className="card_main">

            <div className="card_title">
                <div className="left">
                    <h2 className="battle_id_container">Battle ID: {id}</h2>
                    {famaTotale()}
                    <h2 className="battle_id_container">Kills totali: {totalKills}</h2>
                </div>

                <div className="center">
                    <h2 className="battle_title_container">
                        <span style={{ fontWeight: "bold" }}>
                            {guilds.map((guild, index) => (
                                <React.Fragment key={guild.nome}>
                                    {vincitore( guild.nome)}
                                    {index < guilds.length - 1 && (
                                    <span className="vs-card-inline"> VS </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </span>
                    </h2>
                </div>

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
                        <p>
                            <span style={{fontWeight: "bold"}}>Data:</span>
                            <span style={{color: "#0081cf"}}>
                                {new Date(date.replace(/\.\d+Z$/, 'Z')).toLocaleString([], {
                                    dateStyle: 'short',
                                    timeStyle: 'short'
                                })}
                            </span>
                        </p>
                        <p>
                            <span style={{fontWeight: "bold"}}>Winner:</span>
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
                                        <p>VS</p>
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