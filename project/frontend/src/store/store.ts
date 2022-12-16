import { configureStore } from '@reduxjs/toolkit';
import playersSlice from "./features/playersSlice/playersSlice";
import gameSlice from "./features/gameSlice/gameSlice";

const store = configureStore({
    reducer: {
        gameSlice: gameSlice,
        playersSlice: playersSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store