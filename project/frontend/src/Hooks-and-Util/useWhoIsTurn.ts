import {useMemo} from "react";
import {useGameStateIndex} from "../store/features/gameSlice/useGameStateIndex";

type whoIsTurnFun = (playersArrLength: number, isFirstRound: boolean) => void;
export function useWhoIsTurn():whoIsTurnFun {
    const {gameState, gameStateFun} = useGameStateIndex();
    const {turnChange} = gameStateFun;

    return useMemo(() => (playersArrLength: number, isFirstRound: boolean) => {
        if (isFirstRound) {
            turnChange(Math.floor(Math.random() * playersArrLength));
        } else {
                let turn = gameState.whoIsTurn;

            if (turn < playersArrLength - 1) {
                turn++
                turnChange(turn);
            } else {
                turnChange(0);
            }
        }
    }, [gameState.whoIsTurn]);
}