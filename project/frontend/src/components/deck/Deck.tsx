import {CardComponent} from "../card/card";
import {numToStringConvertor} from "../../Hooks-and-Util/utilsFun";
import {DeckStyle} from './deckStyles'
import {IPlayer} from "../../interfaces/IPlayer";
import {ICard} from "../../interfaces/ICard";

interface IDeckProps {
    showStartGameButton:boolean;
    handleStartGame:() => void;
    players:IPlayer[];
    deck:ICard[];
    whoIsTurn:number;
}

export function Deck({showStartGameButton, handleStartGame, players, deck, whoIsTurn}:IDeckProps) {
    return (
        <>
            <DeckStyle>
                {showStartGameButton &&
                    <button
                        onClick={handleStartGame}
                        disabled={players.length === 0}>
                        Start Game
                    </button>}
                {!showStartGameButton &&
                    deck.map(card =>
                        card.symbol !== '' && card.num !== '' &&
                        <CardComponent
                            isYourTurn={whoIsTurn === 0}
                            card={card}
                            key={`${card.num}${card.symbol}`}
                            src={`../../cardsImages/${card.symbol}/${numToStringConvertor(card.num)}.png`}
                            alt={'deck cards'}
                            playerIndex={6}/>
                    )
                }
            </DeckStyle>
        </>
    );
}