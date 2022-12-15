import {AppDispatch} from "../../store";
import {Card} from "../../../interfaces/card";
import {useAppDispatch} from "./reduxHooks";
import {addToPlayer, takeFromPlayerCard} from "../playersSlice";
import {addToDeck, takeFromDeck} from "../gameSlice";
import {useState} from "react";

interface IDeliverFun {
    fromPlayerToDeck:(card:Card) => AppDispatch;
    fromDeckToPlayer:(card:Card) => AppDispatch;
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