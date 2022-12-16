import {ICard} from "./ICard";

export interface IPlayer {
    playerId: string;
    playerName: string;
    playerScore: number;
    isYourTurn: boolean;
    playerCards: ICard[];
}

export interface IPlayerComponent {
    player: IPlayer;
    isYou:boolean;
    playerIndex:number;
}