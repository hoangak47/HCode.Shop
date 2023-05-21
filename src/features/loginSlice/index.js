import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        toggle: false,
        user:
            {
                ...cookie.get('user'),
            } || [],
        profileLeftActive: 0,
    },
    reducers: {
        setToggle: (state, action) => {
            state.toggle = action.payload;
        },
        setUser: (state, action) => {
            const time = new Date(Date.now() + 1000 * 60 * 10);
            state.user = {
                ...action.payload,
            };
            cookie.set('user', action.payload, { path: '/', expires: time });
        },
        removeUser: (state) => {
            state.user = [];
            cookie.remove('user', { path: '/' });
        },
        setProfileLeftActive: (state, action) => {
            state.profileLeftActive = action.payload;
        },
    },
});

export const { setToggle, setUser, removeUser, setProfileLeftActive } = loginSlice.actions;
export default loginSlice.reducer;
