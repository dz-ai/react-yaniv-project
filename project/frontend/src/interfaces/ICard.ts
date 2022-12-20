export interface ICard {
    symbol: string;
    num: number | string;
    cardRule?:boolean;
    deckCard?:boolean;
}

export interface ICardCompInterface {
    isYourTurn:boolean;
    card:ICard;
    src:string;
    alt:string;
    playerIndex:number;
}