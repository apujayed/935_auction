import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../../types/types';

interface ProfileState {
    profile: Profile | null;
}

const initialState: ProfileState = {
    profile: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = null;
        },
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;