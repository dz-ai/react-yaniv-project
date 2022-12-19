import {ICard} from "../../interfaces/ICard";
import {useMemo} from "react";
import {useGameStateIndex} from "../../store/features/gameSlice/useGameStateIndex";
import {usePlayerStateIndex} from "../../store/features/playersSlice/usePlayerStateIndex";

type gameRulesFunction = (deck: ICard[], playerCards: ICard[]) => void;

type gameRulesReturnObj = {
    deckRule: ICard[];
    playersCardRule: ICard[];
}

export function useGameRules(): gameRulesFunction {
    const {gameState, gameStateFun} = useGameStateIndex();
    const {whoIsTurn} = gameState;
    const {changeDeckCardRule} = gameStateFun;
    const {playerStateFun} = usePlayerStateIndex();
    const {changeCardRule} = playerStateFun;

    return useMemo(() => (deckRule: ICard[], playersCardRule: ICard[]): void => {

        let inPlayerArr = [...playersCardRule];
        let inDeckArr = [...deckRule];

        inPlayerArr = inPlayerArr.map(card => {
            if (card.num > 5 || typeof card.num === 'string') {
                return {...card, cardRule:true};
            } else {
                return {...card, cardRule:false};
            }
        });
        changeCardRule(inPlayerArr);

        inDeckArr = inDeckArr.map(card => {
            if (card.num > 5 || typeof card.num === 'string') {
                return {...card, cardRule:true};
            } else {
                return {...card, cardRule:false};
            }
        });
        changeDeckCardRule(inDeckArr);


    }, [whoIsTurn]);
}