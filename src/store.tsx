import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menu/menu';
import profileReducer from './features/profiles/profiles';
const store = configureStore({
  reducer: {
    menu: menuReducer,
    profile: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;