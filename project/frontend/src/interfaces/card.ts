export interface Card {
    symbol: string;
    num: number | string;
}

export interface CardCompInterface {
    card:Card;
    src:string;
    alt:string;
    playerIndex :number;
}