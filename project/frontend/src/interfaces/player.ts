import {Card} from "./card";

export interface IPlayer {
    playerId: string;
    playerName: string;
    playerScore: number;
    isYourTurn: boolean;
    playerCards: Card[];
}

export interface PlayerComponent {
    player: IPlayer;
    isYou:boolean;
    playerIndex:number;
}


// export interface Player {
//     map(player: (player) => void):void;
//     players: Player[]
// }

