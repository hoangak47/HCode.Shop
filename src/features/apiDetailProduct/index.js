import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

export const apiDetailProduct = createSlice({
    name: 'apiDetailProduct',
    initialState: {
        data: [],
        id: '',
        url: ``,
    },
    reducers: {
        setID: (state, action) => {
            state.id = action.payload;
            state.url = `${api}/products/${state.id}`;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setID, setData } = apiDetailProduct.actions;
export default apiDetailProduct.reducer;
