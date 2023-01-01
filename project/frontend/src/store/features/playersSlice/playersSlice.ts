import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICard} from "../../../interfaces/ICard";
import {IPlayer} from "../../../interfaces/IPlayer";

interface playerSliceState extends IPlayer {
    cardOut: unknown;
}

const initialState: playerSliceState = {
    isYourTurn: false,
    playerCards: [],
    playerId: "",
    playerName: "",
    playerScore: 0,
    cardOut: {}
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        initPlayers: (state, action: PayloadAction<IPlayer>) => {

            if (action.payload) {
                const {playerId, playerName, isYourTurn, playerCards, playerScore} = action.payload;

                state.playerId = playerId;
                state.playerName = playerName;
                state.isYourTurn = true;
                state.playerCards = playerCards;
                state.playerScore = playerScore;
            }
        },
        takeFromPlayerCard: (state, action: PayloadAction<ICard>) => {
            const card = action.payload;
            state.playerCards = [...state.playerCards]
                .filter(cardFilter => {
                    if (cardFilter.num !== card.num || cardFilter.symbol !== card.symbol) {
                        return cardFilter;
                    }
                });
        },
        addToPlayer: (state, action: PayloadAction<ICard>) => {
            let card = action.payload;
            card = {...card ,cardRule: false, deckCard: true};
            state.playerCards.push(card);
        },
        changeCardRule: (state, action: PayloadAction<ICard[]>) => {

            const inArr = action.payload;

            return {
                ...state,
                playerCards: inArr,
            };

        },
    },
});

export const {initPlayers, takeFromPlayerCard, addToPlayer, changeCardRule} = playersSlice.actions;
export default playersSlice.reducer;

const arr = [{a: 1}, {a: 2}, {a: 3}];

arr.forEach(num => num.a + 2);
