import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Card} from "../../interfaces/card";
import {IPlayer} from "../../interfaces/player";

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
       initPlayers: (state, action:PayloadAction<IPlayer>) => {
           if (action.payload) {
            const {playerId, playerName, isYourTurn, playerCards, playerScore} = action.payload;

               state.playerId = playerId;
               state.playerName = playerName;
               state.isYourTurn = isYourTurn;
               state.playerCards = playerCards;
               state.playerScore = playerScore;
           }
       },
        takeFromPlayerCard: (state, action:PayloadAction<Card>) => {
           const card = action.payload;
            console.log(card)
            state.playerCards = [...state.playerCards]
                .filter(cardFilter => {
                    if (cardFilter.num !== card.num || cardFilter.symbol !== card.symbol) {
                        return cardFilter;
                    }
                });
        },
        addToPlayer: (state, action:PayloadAction<Card>) => {
            console.log('addToPlayer' , action.payload)
            state.playerCards.push(action.payload);
        },
    },
});

export const {initPlayers, takeFromPlayerCard, addToPlayer} = playersSlice.actions;
export default playersSlice.reducer;
