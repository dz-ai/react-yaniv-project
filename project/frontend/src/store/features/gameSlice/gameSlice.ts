import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICard} from "../../../interfaces/ICard";

interface GameState {
    gameIsOn: boolean;
    deck: ICard[];
    whoIsTurn: number;
}

const initialState: GameState = {
    gameIsOn: false,
    deck: [],
    whoIsTurn: 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameIsOn = true;
        },
        addToDeck: (state, action: PayloadAction<ICard>) => {
            state.deck.push(action.payload);
        },
        takeFromDeck: (state, action: PayloadAction<ICard>) => {
            const card = action.payload;
            state.deck = [...state.deck].filter(cardFilter => {
                return cardFilter.num !== card.num || cardFilter.symbol !== card.symbol;
            })
        },
        turnChange: (state, action: PayloadAction<number>) => {
            state.whoIsTurn = action.payload;
        },
        changeDeckCardRule:
            (state, action:PayloadAction<ICard[]>) => {
                console.log('run')
                return {
                    ...state,
                    deck: action.payload,
                }
        }
    },
});

export const {startGame,addToDeck, takeFromDeck, turnChange, changeDeckCardRule} = gameSlice.actions;

export default gameSlice.reducer;

