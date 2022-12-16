export interface ICard {
    symbol: string;
    num: number | string;
}

export interface ICardCompInterface {
    isYourTurn:boolean;
    card:ICard;
    src:string;
    alt:string;
    playerIndex :number;
}