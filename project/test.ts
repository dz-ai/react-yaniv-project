import {ICard} from "./frontend/src/interfaces/ICard";

export let CARDS:ICard[] = [
    {num: 1, symbol: 'Clubs'},
    {num: 2, symbol: 'Clubs'},
    {num: 3, symbol: 'Clubs'},
    {num: 7, symbol: 'Clubs'},
    {num: 7, symbol: 'Diamonds'}
]

// function possibleCombinations(cards: ICard[]): ICard[] {
//     for (let i=0; i < cards.length; i++) {
//         const cardsElement = cards[i];
//         for (let j = 0; j < cards.length; j++) {
//             const cardsElement1 = cards[j];
//
//             if (cardsElement.num === cardsElement1.num && i !== j) {
//                 cards[i] = {...cards[i], cardRule: true}
//                 cards[j] = {...cards[j], cardRule: true}
//             }
//
//         }
//     }
//     console.log(cards)
//     return [...cards]
// }
//
// possibleCombinations(cards);
