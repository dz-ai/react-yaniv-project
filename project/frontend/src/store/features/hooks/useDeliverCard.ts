import {AppDispatch} from "../../store";
import {ICard} from "../../../interfaces/ICard";
import {useAppDispatch} from "./reduxHooks";
import {addToPlayer, takeFromPlayerCard} from "../playersSlice/playersSlice";
import {addToDeck, takeFromDeck} from "../gameSlice/gameSlice";
import {useState} from "react";

interface IDeliverFun {
    fromPlayerToDeck:(card:ICard) => AppDispatch;
    fromDeckToPlayer:(card:ICard) => AppDispatch;
}

export function useDeliverCard():IDeliverFun {
    const dispatch = useAppDispatch();

    const [funObj] = useState(<IDeliverFun>{
        fromPlayerToDeck: card => {
            dispatch(takeFromPlayerCard(card))
            dispatch(addToDeck(card))
        },
        fromDeckToPlayer: card => {
            dispatch(takeFromDeck(card));
            dispatch(addToPlayer(card));
        }
    });

    return funObj
}