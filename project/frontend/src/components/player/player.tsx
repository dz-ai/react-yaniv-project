import {ICard} from "../../interfaces/ICard";
import {IPlayerComponent} from "../../interfaces/IPlayer";
import {CardComponent} from "../card/card";
import React from "react";

export function Player({player, isYou, playerIndex}: IPlayerComponent) {
    return (
        <>
            <p>{player.playerName}</p>
            {
                player.playerCards.map((card: ICard, index: number) =>
                    isYou
                        ?

                        <CardComponent
                            isYourTurn={player.isYourTurn}
                            card={card}
                            src={`../../cardsImages/${card.symbol}/${card.num}.png`}
                            alt="your cards"
                            playerIndex={playerIndex}
                            key={index}
                        />
                        :
                        <CardComponent
                            isYourTurn={player.isYourTurn}
                            card={card}
                            src={playerIndex % 2 !== 0 ? '../../cardsImages/backCardHori.png' : '../../cardsImages/Peter River.png'}
                            alt="others cards"
                            playerIndex={playerIndex}
                            key={index}
                        />
                )
            }
        </>
    );
};