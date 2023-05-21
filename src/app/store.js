import { configureStore } from '@reduxjs/toolkit';
import apiProductReducer from '../features/apiProduct/apiProductSlice';
import apiCategoryReducer from '../features/apiCategory/apiCategorySlice';
import apiDetailProductReducer from '../features/apiDetailProduct';
import loginSliceReducer from '../features/loginSlice';
import purchaseOrderReducer from '../features/purchaseOrderSlice';
import cartReducer from '../features/cartSlice';
import purchasesDetailSliceReducer from '../features/p.urchasesDetailSlice';

export default configureStore({
    reducer: {
        apiProduct: apiProductReducer,
        apiCategory: apiCategoryReducer,
        apiDetailProduct: apiDetailProductReducer,
        loginSlice: loginSliceReducer,
        purchaseOrderSlice: purchaseOrderReducer,
        cartSlice: cartReducer,
        purchasesDetailSlice: purchasesDetailSliceReducer,
    },
});
