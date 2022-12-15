import {Card} from "../../interfaces/card";
import {PlayerComponent} from "../../interfaces/player";
import {CardComponent} from "../card/card";

export function Player({player, isYou, playerIndex}: PlayerComponent) {
    return (
        <>
            <p>{player.playerName}</p>
            {
                player.playerCards.map((card: Card, index: number) =>
                    isYou
                        ?

                        <CardComponent
                            card={card}
                            src={`../../cardsImages/${card.symbol}/${card.num}.png`}
                            alt="your cards"
                            playerIndex={playerIndex}
                            key={index}
                        />
                        :
                        <CardComponent
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