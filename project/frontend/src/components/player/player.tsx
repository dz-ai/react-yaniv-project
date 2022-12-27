import {ICard} from "../../interfaces/ICard";
import {IPlayer} from "../../interfaces/IPlayer";
import {CardComponent} from "../card/card";
import React from "react";
import {numToStringConvertor} from "../../Hooks-and-Util/utilsFun";
import {CacheButtonStyle, PlayerStyle} from "./playerStyle";

interface IPlayerComponent {
    player: IPlayer;
    isYou: boolean;
    playerIndex: number;
    whoIsTurn?: number;
    handleCacheButton?: () => void;
}

export function Player({player, isYou, playerIndex, whoIsTurn, handleCacheButton}: IPlayerComponent) {
    return (
        <PlayerStyle isYou={isYou}>

            <p>{player.playerName}</p>

            <CacheButtonStyle
                disabled={whoIsTurn !== 0}
                onClick={handleCacheButton}>
                Cache
            </CacheButtonStyle>

            {
                player.playerCards.map((card: ICard) =>
                    isYou
                        ?

                        <CardComponent
                            isYourTurn={player.isYourTurn}
                            card={card}
                            src={`../../cardsImages/${card.symbol}/${numToStringConvertor(card.num)}.png`}
                            alt="your cards"
                            playerIndex={playerIndex}
                            key={`${card.symbol}${card.num}`}
                        />
                        :
                        <CardComponent
                            isYourTurn={player.isYourTurn}
                            card={card}
                            src={playerIndex % 2 !== 0 ? '../../cardsImages/backCardHori.png' : '../../cardsImages/Peter River.png'}
                            alt="others cards"
                            playerIndex={playerIndex}
                            key={`${card.symbol}${card.num}`}
                        />
                )
            }
        </PlayerStyle>
    );
}