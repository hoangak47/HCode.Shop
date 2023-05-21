import NoneFooter from '../Layout/NoneFooter';
import NoneLayout from '../Layout/NoneLayout';
import Cart from '../Pages/Cart';
import DetailProduct from '../Pages/DetailProduct';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import Purchases from '../Pages/Purchases';
import PurchasesDetail from '../Pages/PurchasesDetail';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/product/:name/:id',
        component: DetailProduct,
    },
    {
        path: '/login',
        component: Login,
        layout: NoneLayout,
    },
    {
        path: '/profile/:id',
        component: Profile,
    },
    {
        path: '/cart',
        component: Cart,
        layout: NoneFooter,
    },
    {
        path: '/purchases',
        component: Purchases,
    },
    {
        path: '/purchases/:id',
        component: PurchasesDetail,
    },
];

export default publicRoutes;
