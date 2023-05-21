import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cart: [],
        valueChecked: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setValueChecked: (state, action) => {
            state.valueChecked = action.payload;
        },
    },
});

export const { setCart, setValueChecked } = cartSlice.actions;
export default cartSlice.reducer;
