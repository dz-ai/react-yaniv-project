import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICard} from "../../../interfaces/ICard";

interface GameState {
    deck: ICard[];
    whoIsTurn: number;
}

const initialState: GameState = {
    deck: [],
    whoIsTurn: 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
       addToDeck: (state, action: PayloadAction<ICard>) => {
           state.deck.push(action.payload);
       },
        takeFromDeck: (state,action:PayloadAction<ICard>) => {
          const card = action.payload;
          state.deck = [...state.deck].filter(cardFilter => {
              return cardFilter.num !== card.num || cardFilter.symbol !== card.symbol;
          })
        },
        turnChange: (state,action:PayloadAction<number>) => {
           state.whoIsTurn = action.payload;
        },
    },
});

export const {addToDeck, takeFromDeck, turnChange} = gameSlice.actions;

export default gameSlice.reducer;

