import {Card} from "../interfaces/card";
import {Player} from "../interfaces/player";
import {v4 as uuidv4} from 'uuid';
import {useEffect, useState} from "react";

export const usePlayersCards = (yourName:string, numOfPlayers:number) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        createCards()
            .then(cards => {
                setPlayersNames(yourName, numOfPlayers, cards, setCards, setPlayers)
                    .catch(console.log);
            });
    }, []);


    return {players, cards};
}


function createCards(): Promise<Card[]> {
    const symbols = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const num = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

    const cards: Card[] = [{symbol: 'Jokers', num: 'Joker_1'}, {symbol: 'Jokers', num: 'Joker_2'}];

    symbols.forEach(symbol => {
        num.forEach(num => cards.push({symbol, num}))
    });

    for (let i = 0; i < 7000; i++) {
        const random = Math.floor(Math.random() * 54);
        const random2 = Math.floor(Math.random() * 54);
        [cards[random], cards[random2]] = [cards[random2], cards[random]];
    }

    return new Promise(resolve => resolve(cards));
}


type setCards = (cards: Card[]) => void;
type setPlayers = (players:Player[]) => void;

function setPlayersNames(
    yourName:string, numOfPlayers: number, cards:Card[], setCards: setCards , setPlayers:setPlayers): Promise<[]> {
    return fetch('http://localhost:6700/names')
        .then(res => res.json())
        .then(results => {
            const players: Player[] = [];

            for (let i = 0; i < numOfPlayers; i++) {
                players.push(<Player>{
                    playerId: uuidv4(),
                    playerName: i === 0 ? yourName : results[i],
                    playerScore: 0,
                    isYourTurn: false,
                    playerCards: [getCard(cards), getCard(cards), getCard(cards), getCard(cards), getCard(cards)],
                });
            };
            setPlayers(players);
            setCards(cards);
        })
        .catch(e => e);
}

export function getCard(cards: Card[]): Card {
    let card = cards.pop();
    if (card) {
        return card
    } else {
        card = {symbol: '', num: ''}
        return  card
    }
}