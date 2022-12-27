import {ICard} from "../interfaces/ICard";
import {IPlayer} from "../interfaces/IPlayer";
import {v4 as uuidv4} from 'uuid';
import {useEffect, useState} from "react";
import {CARDS} from "../../../test";

export const usePlayersCardsCreator = (yourName:string, numOfPlayers:number) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [players, setPlayers] = useState<IPlayer[]>([]);

    useEffect(() => {
        createCards()
            .then(cards => {
                setPlayersNames(yourName, numOfPlayers, cards, setCards, setPlayers)
                    .catch(console.log);
            });
    }, []);


    return {players, cards};
}


function createCards(): Promise<ICard[]> {
    const symbols = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    const cards: ICard[] = [
        {symbol: 'Jokers', num: 'Joker_1', cardRule: false},
        {symbol: 'Jokers', num: 'Joker_2', cardRule: false}
    ];

    symbols.forEach(symbol => {
        num.forEach(num => cards.push({symbol, num, cardRule: true}))
    });

    for (let i = 0; i < 7000; i++) {
        const random = Math.floor(Math.random() * 54);
        const random2 = Math.floor(Math.random() * 54);
        [cards[random], cards[random2]] = [cards[random2], cards[random]];
    }

    return new Promise(resolve => resolve(cards));
}


type setCards = (cards: ICard[]) => void;
type setPlayers = (players:IPlayer[]) => void;

function setPlayersNames(
    yourName:string, numOfPlayers: number, cards:ICard[], setCards: setCards , setPlayers:setPlayers): Promise<[]> {
    return fetch('http://localhost:6700/names')
        .then(res => res.json())
        .then(results => {
            const players: IPlayer[] = [];

            for (let i = 0; i < numOfPlayers; i++) {
                players.push(<IPlayer>{
                    playerId: uuidv4(),
                    playerName: i === 0 ? yourName : results[i],
                    playerScore: 0,
                    isYourTurn: false,
                    playerCards: [...CARDS]/*/!*[getCard(cards), getCard(cards), getCard(cards), getCard(cards), getCard(cards)*!/]*/,
                });
            };
            setPlayers(players);
            setCards(cards);
        })
        .catch(e => e);
}

export function getCard(cards: ICard[]): ICard {
    let card = cards.pop();
    if (card) {
        return card
    } else {
        card = {symbol: '', num: ''}
        return  card
    }
}