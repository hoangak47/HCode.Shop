import { createSlice } from '@reduxjs/toolkit';

export const purchaseOrderSlice = createSlice({
    name: 'purchaseOrderSlice',
    initialState: {
        purchaseOrder: [],
        key: 0,
        loading: false,
    },
    reducers: {
        setPurchaseOrder: (state, action) => {
            state.purchaseOrder = action.payload;
        },
        setKey: (state, action) => {
            state.key = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setPurchaseOrder, setKey, setLoading } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
