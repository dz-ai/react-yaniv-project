import {ICard} from "../interfaces/ICard";
import {useMemo, useState} from "react";
import {useGameStateIndex} from "../store/features/gameSlice/useGameStateIndex";
import {usePlayerStateIndex} from "../store/features/playersSlice/usePlayerStateIndex";

type gameRulesFunction = (deck: ICard[], playerCards: ICard[]) => void;

export function useGameRules(): gameRulesFunction {
    const {gameState} = useGameStateIndex();
    const {whoIsTurn, deck, throwCount} = gameState;
    const {playerStateFun} = usePlayerStateIndex();
    const {changeCardRule} = playerStateFun;

    const [isASequenceSituation, setIsASequenceSituation] = useState<boolean>(false);


    return useMemo(() => (deckRule: ICard[], playersCardRule: ICard[]): void => {

        let inPlayerArr = [...playersCardRule];


        if (throwCount === 0) {
            inPlayerArr = inPlayerArr
                .map(card => {
                    return {...card, cardRule: true}
                });
            changeCardRule(inPlayerArr);

        } else {
            inPlayerArr = possibleCombinations(
                inPlayerArr,
                isASequenceSituation,
                setIsASequenceSituation,
                deck, throwCount);

            changeCardRule(inPlayerArr);
        }


    }, [whoIsTurn, deck]);
}


function possibleCombinations(cards: ICard[],
                              isASequenceSituation: boolean,
                              setIsASequenceSituation: (arg: boolean) => void,
                              deck?: ICard[],
                              throwCount?: number): ICard[] {

    let deckIn;
    if (deck && deck.length > 0) {
        deckIn = deck[deck.length - 1];
    } else {
        deckIn = {symbol: '', num: ''};
    }

    //  threesome sequence tester //
    const threesomeTest: (string | number)[] = [];


    for (let i = 0; i < cards.length; i++) {
        const cardsElement = cards[i];
        cards[i] = {...cards[i], cardRule: false};

        if (cardsElement.deckCard) break;

        if (cards[i].symbol === 'Jokers') {
            cards[i] = {...cards[i], cardRule: true};
            threesomeTest.push(i);
        }

        //////// test for three same symbol with sequence ////////////
        if (cardsElement.symbol === deckIn.symbol) {

            deck && deck.forEach((card) => {
                if (card.deckCard &&
                    cardsElement.num === card.num as number - 1 || cardsElement.num === card.num as number + 1) {

                    console.log('+-1', i)
                    threesomeTest.push('');
                    !threesomeTest.includes(i) && threesomeTest.push(i);
                    console.log(threesomeTest)

                }
                if (card.deckCard &&
                    cardsElement.num === card.num as number - 2 || cardsElement.num === card.num as number + 2) {
                    console.log('+-2', i)
                    threesomeTest.push('');
                    !threesomeTest.includes(i) && threesomeTest.push(i);
                    console.log(threesomeTest)
                }
            });

        }
                    console.log(threesomeTest, isASequenceSituation)

        //////// test for same number cards ////////
        if (threesomeTest.length < 2 &&
            cardsElement.num === deckIn.num || deckIn.symbol === 'Jokers') {
            !isASequenceSituation ? cards[i] = {...cards[i], cardRule: true} : null;
        }
        if (threesomeTest.length > 1 &&
            throwCount === 1 && cardsElement.num === deckIn.num || deckIn.symbol === 'Jokers') {
            !isASequenceSituation ? cards[i] = {...cards[i], cardRule: true} : null;
        }


    }
    /////// END OF LOOP ////////

    ////// put the test to the cards if there is 3 cards in sequence /////
    if (threesomeTest.length >= 3) {
        threesomeTest.forEach(indexNum => {
            if (typeof indexNum === 'number') {
                cards[indexNum] = {...cards[indexNum], cardRule: true}
                setIsASequenceSituation(true);
            }
        })
    }

    return [...cards]
}


