import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICard} from "../../../interfaces/ICard";

interface GameState {
    gameIsOn: boolean;
    deck: ICard[];
    whoIsTurn: number;
    throwCount: number;
}

const initialState: GameState = {
    gameIsOn: false,
    deck: [],
    whoIsTurn: 0,
    throwCount: 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameIsOn = true;
        },
        addToDeck: (state, action: PayloadAction<ICard>) => {
            let card;
            if (!state.gameIsOn) {
                card = {...action.payload, cardRule: true, deckCard: false};
            } else {
                card = {...action.payload, cardRule: false, deckCard: true};
            }
            state.deck.push(card);
        },
        takeFromDeck: (state, action: PayloadAction<ICard>) => {
            const card = action.payload;
            state.deck = [...state.deck].filter(cardFilter => {
                return cardFilter.num !== card.num || cardFilter.symbol !== card.symbol;
            })
        },
        turnChange: (state, action: PayloadAction<number>) => {
            state.whoIsTurn = action.payload;
            state.deck = [...state.deck.filter
            (card => {
                if (card.deckCard) {
                    return card;
                }
            })];

            state.deck = [...state.deck.map((card, index) => {
                if (index !== 0 && index !== state.deck.length - 1) {
                    console.log('!==', index, state.deck.length)
                    return {...card, cardRule: false, deckCard: false};
                } else {
                    console.log('===', index, state.deck.length)
                    return {...card, cardRule: true, deckCard: false};
                }
            })];


        },
        changeDeckCardRule:
            (state, action: PayloadAction<ICard[]>) => {
                return {
                    ...state,
                    deck: action.payload,
                }
            },
        throwCountUp: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload !== undefined) {
                state.throwCount = action.payload;
            } else {
                state.throwCount = state.throwCount + 1;
            }
        },
    },
});

export const {startGame, addToDeck, takeFromDeck, turnChange, changeDeckCardRule, throwCountUp} = gameSlice.actions;

export default gameSlice.reducer;

