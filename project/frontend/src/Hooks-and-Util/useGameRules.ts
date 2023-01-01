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
            setIsASequenceSituation(false);
            inPlayerArr = inPlayerArr
                .map(card => {
                    return {...card, cardRule: true, deckCard: false}
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

    let deckIn: ICard;
    let deckIn2: ICard;
    let deckIn3: ICard;
    if (deck && deck.length > 0) {
        deckIn = deck[deck.length - 1];
    } else {
        deckIn = {symbol: '', num: ''};
    }
    if (deck && deck.length > 1) {
        deckIn2 = deck[deck.length - 2];
    } else {
        deckIn2 = {symbol: '', num: '', deckCard: false};
    }
    if (deck && deck.length > 2) {
        deckIn3 = deck[deck.length - 3];
    } else {
        deckIn3 = {symbol: '', num: '', deckCard: false};
    }

    //  threesome sequence tester //
    const threesomeTest: (string | number)[] = [];


    for (let i = 0; i < cards.length; i++) {
        let cardsElement = cards[i];
        cards[i] = {...cards[i], cardRule: false};

        if (cardsElement.deckCard) break;

        if (cards[i].symbol === 'Jokers') {
            cards[i] = {...cards[i], cardRule: true};
            threesomeTest.push(i);
        }


        //////// test for three same symbol with sequence ////////////
        if (cardsElement.symbol === deckIn.symbol || deckIn.symbol === 'Jokers') {


            if (deckIn.symbol === 'Jokers') { /* if last card in deck is a Joker */

                if (typeof cardsElement.num === 'number' /* and found that the next card in deck is in sequence too */
                    && deckIn2.deckCard
                    && deckIn2.symbol === cardsElement.symbol
                    && cardsElement.num - 2 === deckIn2.num) {

                    threesomeTest.push('');
                    threesomeTest.push('');
                    !threesomeTest.includes(i) && threesomeTest.push(i);

                } else if
                (typeof cardsElement.num === 'number'
                    && deckIn2.deckCard
                    && deckIn2.symbol === cardsElement.symbol
                    && cardsElement.num - 1 === deckIn2.num) {

                    threesomeTest.push('');

                } else { /* if not found sequence in deck we search in player's cards */
                    throwCount && throwCount < 2
                        ?
                        cards.forEach((card, index) => {


                            if (typeof card.num === 'number' &&
                                card.symbol === cardsElement.symbol && card.num - 1 === cardsElement.num) {

                                threesomeTest.push('');
                                !threesomeTest.includes(i) && threesomeTest.push(i);
                                !threesomeTest.includes(index) && threesomeTest.push(index);
                            }

                        })
                        : null;
                }

            } else { /* if last card in deck is not a Joker */

                if (typeof cardsElement.num === 'number'
                    && cardsElement.num - 1 === deckIn.num) { /* if first card in deck is in sequence */


                    if (deckIn2.deckCard &&
                        deckIn2.symbol === cardsElement.symbol &&
                        cardsElement.num - 2 === deckIn2.num) { /* if found that the next card in deck is in sequence too */

                        threesomeTest.push('');
                        threesomeTest.push('');
                        !threesomeTest.includes(i) && threesomeTest.push(i);

                    } else if (deckIn2.deckCard && deckIn2.symbol === 'Jokers') { /* if next card in deck is Joker */

                        threesomeTest.push('');
                        threesomeTest.push('');
                        !threesomeTest.includes(i) && threesomeTest.push(i);

                    } else { /* if not found sequence in next card deck we search in player's cards */

                        cards.forEach((card, index) => {

                            if (card.symbol === 'Jokers') {
                                threesomeTest.push('');
                                threesomeTest.push(i);
                            }

                            if (typeof card.num === 'number' &&
                                card.symbol === cardsElement.symbol && card.num - 1 === cardsElement.num) {

                                threesomeTest.push('');
                                !threesomeTest.includes(i) && threesomeTest.push(i);
                                !threesomeTest.includes(index) && threesomeTest.push(index);
                            }
                        });
                    }
                    //
                }
                //  end of not Joker condition
            }
            ///////   END OF CONDITIONS   ///////

        }
        //////// END test for three same symbol with sequence END ////////////

        console.log(threesomeTest, isASequenceSituation);

        //////// test for same number cards ////////
        /* check for only one same number sequence */
        if (threesomeTest.length < 3 && cardsElement.num === deckIn.num || deckIn.symbol === 'Jokers') {
            if (deckIn.symbol === 'Jokers' && deckIn2.num === cardsElement.num) {
                cards[i] = {...cards[i], cardRule: true};
            }
            if (deckIn.symbol === 'Jokers' && deckIn2.num !== cardsElement.num) {
                cards[i] = {...cards[i], cardRule: false};
            }
            if (cardsElement.num === deckIn.num) {
                !isASequenceSituation ? cards[i] = {...cards[i], cardRule: true} : null;
            }

        }
        /* check for more than one same number sequence */
        if (deckIn.deckCard && deckIn2.deckCard && deckIn.num === deckIn2.num) {

            threesomeTest.length = 0;
            setIsASequenceSituation(false);

            cards.forEach((card, index) => {
                if (card.num === cardsElement.num && index !== i) {
                    cards[i] = {...cards[i], cardRule: true};
                }
            });
        } /* check for more than one same number sequence with Joker */
        if (deckIn.deckCard && deckIn2.deckCard && deckIn3.deckCard &&
            deckIn.num === deckIn3.num && deckIn2.symbol === 'Jokers') {

            threesomeTest.length = 0;
            setIsASequenceSituation(false);

            cards.forEach((card, index) => {
                if (card.num === cardsElement.num && index !== i) {
                    cards[i] = {...cards[i], cardRule: true};
                }
            });
        }
        //
        if (threesomeTest.length >= 3 && throwCount === 1 && cardsElement.num === deckIn.num) {
            cards[i] = {...cards[i], cardRule: true};
        }
        if (throwCount === 1 && deckIn.symbol === 'Jokers') {
            cards[i] = {...cards[i], cardRule: true};
        }


    }
    /////// END OF LOOP ////////

    // if we are at same num situation //
    if (deckIn.deckCard && deckIn2.deckCard && deckIn.num === deckIn2.num) {
        threesomeTest.length = 0;
    }
    // if we are at same num situation with Joker//
    if (deckIn.deckCard && deckIn2.deckCard && deckIn3.deckCard &&
        deckIn.symbol === 'Jokers' && deckIn2.num === deckIn3.num) {
        threesomeTest.length = 0;
    }

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


