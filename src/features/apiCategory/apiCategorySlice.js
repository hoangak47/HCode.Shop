import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

export const apiCategory = createSlice({
    name: 'apiCategory',
    initialState: {
        url: api + `/categories`,
        categories: [],

        price_min: '',
        price_max: '',

        indexActive: '',
        indexActiveRating: '',
    },
    reducers: {
        setCategory: (state, action) => {
            state.categories = action.payload;
        },
        setIndexActive: (state, action) => {
            state.indexActive = action.payload;
        },
        setindexActiveRating: (state, action) => {
            state.indexActiveRating = action.payload;
        },

        setPriceMin: (state, action) => {
            state.price_min = action.payload;
        },
        setPriceMax: (state, action) => {
            state.price_max = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCategory, setIndexActive, setindexActiveRating, setPriceMin, setPriceMax } = apiCategory.actions;

export default apiCategory.reducer;
