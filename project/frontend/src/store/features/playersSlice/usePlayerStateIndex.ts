import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useState} from "react";
import {addToPlayer, changeCardRule, initPlayers, takeFromPlayerCard} from "./playersSlice";
import {IPlayer} from "../../../interfaces/IPlayer";
import {ICard} from "../../../interfaces/ICard";

export function usePlayerStateIndex() {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector(state => state.playersSlice);

    const [playerStateFun] = useState({
        initPlayers: (player:IPlayer) => dispatch(initPlayers(player)),
        takeFromPlayerCard: (card:ICard) => dispatch(takeFromPlayerCard(card)),
        addToPlayer: (card:ICard) => dispatch(addToPlayer(card)),
        changeCardRule: (cards:ICard[]) => dispatch(changeCardRule(cards)),
    });

    return {playerState , playerStateFun}
}