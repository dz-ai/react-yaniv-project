import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useState} from "react";
import {addToDeck, startGame, takeFromDeck, turnChange} from "./gameSlice";
import {ICard} from "../../../interfaces/ICard";

export function useGameStateIndex() {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(state => state.gameSlice);

    const [gameStateFun] = useState({
        startGame: () => dispatch(startGame()),
        addToDeck: (card:ICard) => dispatch(addToDeck(card)),
        takeFromDeck: (card:ICard) => dispatch(takeFromDeck(card)),
        turnChange: (num:number) => dispatch(turnChange(num)),
    });

    return {gameStateFun, gameState};
}