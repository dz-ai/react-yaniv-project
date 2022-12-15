import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Card} from "../../interfaces/card";

interface GameState {
    deck: Card[];
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
       addToDeck: (state, action: PayloadAction<Card>) => {
           state.deck.push(action.payload);
       },
        takeFromDeck: (state,action:PayloadAction<Card>) => {
          const card = action.payload;
          state.deck = [...state.deck].filter(cardFilter => {
              return cardFilter.num !== card.num || cardFilter.symbol !== card.symbol;
          })
        },
    },
});

export const {addToDeck, takeFromDeck} = gameSlice.actions;

export default gameSlice.reducer;

