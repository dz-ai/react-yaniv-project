import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useState} from "react";
import {
    addToDeck,
    changeDeckCardRule,
    throwCountUp,
    startGame,
    takeFromDeck,
    turnChange
} from "./gameSlice";
import {ICard} from "../../../interfaces/ICard";

export function useGameStateIndex() {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(state => state.gameSlice);

    const [gameStateFun] = useState({
        startGame: () => dispatch(startGame()),
        addToDeck: (card:ICard) => dispatch(addToDeck(card)),
        takeFromDeck: (card:ICard) => dispatch(takeFromDeck(card)),
        turnChange: (num:number) => dispatch(turnChange(num)),
        changeDeckCardRule: (cards:ICard[]) => dispatch(changeDeckCardRule(cards)),
        throwCountUp: (zero?:number) => dispatch(throwCountUp(zero)), /* <= if passing number 0 as an argument
                                                                        it put  counter back to 0 else it
                                                                        pops the count up in one number */
    });

    return {gameStateFun, gameState};
}