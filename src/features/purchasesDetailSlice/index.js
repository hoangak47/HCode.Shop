import { createSlice } from '@reduxjs/toolkit';

export const purchasesDetailSlice = createSlice({
    name: 'purchasesDetailSlice',
    initialState: {
        id: '',
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { setId } = purchasesDetailSlice.actions;
export default purchasesDetailSlice.reducer;
