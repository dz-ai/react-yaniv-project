import {AppDispatch} from "../store/store";
import {ICard} from "../interfaces/ICard";
import {useState} from "react";
import {useGameStateIndex} from "../store/features/gameSlice/useGameStateIndex";
import {usePlayerStateIndex} from "../store/features/playersSlice/usePlayerStateIndex";

interface IDeliverFun {
    fromPlayerToDeck:(card:ICard) => AppDispatch;
    fromDeckToPlayer:(card:ICard) => AppDispatch;
}

export function useDeliverCard():IDeliverFun {
    const {gameStateFun} = useGameStateIndex();
    const {takeFromDeck, addToDeck} = gameStateFun;
    const {playerStateFun} = usePlayerStateIndex();
    const {takeFromPlayerCard, addToPlayer} = playerStateFun;

    const [funObj] = useState(<IDeliverFun>{
        fromPlayerToDeck: card => {
            takeFromPlayerCard(card);
            addToDeck(card);
        },
        fromDeckToPlayer: card => {
            takeFromDeck(card);
            addToPlayer(card);
        }
    });

    return funObj
}