export interface ICard {
    symbol: string;
    num: number | string;
}

export interface ICardCompInterface {
    card:ICard;
    src:string;
    alt:string;
    playerIndex :number;
}