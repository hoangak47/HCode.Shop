import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

export const apiProduct = createSlice({
    name: 'apiProduct',
    initialState: {
        loading: false,
        data: [],
        url: `${api}/products?page=1&limit=15&sort_by=view`,
        sortIndex: 0,
        valueSelect: '',
        page: 1,
        category: '',
        rating_filter: '',
        price_max: '',
        price_min: '',
        sort_by: 'view',
        order: '',
        name: '',
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIndexSort: (state, action) => {
            state.sortIndex = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setCategory: (state, action) => {
            state.name = '';
            state.price_max = '';
            state.price_min = '';
            state.category = action.payload;
        },
        setRatingFilter: (state, action) => {
            state.rating_filter = action.payload;
        },
        setPriceMax: (state, action) => {
            state.price_max = action.payload;
        },
        setPriceMin: (state, action) => {
            state.price_min = action.payload;
        },
        setSortBy: (state, action) => {
            state.sort_by = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setURL: (state, action) => {
            state.url = `${api}/products?${state.page ? `page=${state.page}` : 1}&limit=15${
                state.category ? `&category=${state.category}` : ''
            }${state.rating_filter || state.rating_filter === 0 ? `&rating_filter=${state.rating_filter}` : ''}${
                state.price_max || state.price_max === 0 ? `&price_max=${state.price_max}` : ''
            }${state.price_min || state.price_min === 0 ? `&price_min=${state.price_min}` : ''}${
                state.sort_by ? `&sort_by=${state.sort_by}` : ''
            }${state.name ? `&name=${state.name}` : ''}${state.order ? `&order=${state.order}` : ''}`;
        },
        setClearState: (state, action) => {
            state.page = 1;
            state.category = '';
            state.rating_filter = '';
            state.price_max = '';
            state.price_min = '';
            state.sort_by = 'view';
            state.order = '';
            state.name = '';
            state.sortIndex = 0;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setLoading,
    setData,
    setIndexSort,
    setPage,
    setCategory,
    setRatingFilter,
    setPriceMax,
    setPriceMin,
    setSortBy,
    setOrder,
    setURL,
    setClearState,
    setName,
} = apiProduct.actions;

export default apiProduct.reducer;
