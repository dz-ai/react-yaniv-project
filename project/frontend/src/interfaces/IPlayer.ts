import {ICard} from "./ICard";

export interface IPlayer {
    playerId: string;
    playerName: string;
    playerScore: number;
    isYourTurn: boolean;
    playerCards: ICard[];
}
