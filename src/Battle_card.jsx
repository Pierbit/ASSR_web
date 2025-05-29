import './assets/components_css/battle_card.css'
import Guild_card from './Guild_card.jsx'
import React from "react";

function Battle_card({id, date, winner, rats, guilds, secondaryguilds}) {

    function ratteria(){
        if(rats >= 0 && rats <= 5){
            return <p><span style={{fontWeight:"bold"}}>Rats:</span> <span style={{color:"#0081cf"}}>{rats}</span></p>;
        } else if(rats > 5 && rats <= 10){
            return <p><span style={{fontWeight:"bold"}}>Rats:</span> <span style={{color:"#ffc75f"}}>{rats}</span></p>;
        } else {
            return <p><span style={{fontWeight:"bold"}}>Rats:</span> <span style={{color:"red"}}>{rats}</span></p>;
        }
    }

    return (
        <>
            <div className="card_main">
                <div className="card_title">
                    <h2><span style={{fontWeight:"bold"}}>Battle:</span> {id}</h2>
                </div>
                <div className="card_stats">
                    <p><span style={{fontWeight:"bold"}}>Data:</span> <span style={{color:"#0081cf"}}>{new Date(date.replace(/\.\d+Z$/, 'Z')).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span></p>
                    <p><span style={{fontWeight:"bold"}}>Winner:</span> <span style={{color:"green"}}>{winner}</span></p>
                    {ratteria()}
                </div>
                <div className="card_guilds">
                    {guilds.map((guild, index) => (
                        <React.Fragment key={index}>
                            <Guild_card
                                key={guild.nome}
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
        </>
    )
}

export default Battle_card;