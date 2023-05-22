import axios from 'axios';

import { setCart } from '../../features/cartSlice';
import { api } from '../../api';
import { message } from 'antd';

function getCart(user, dispatch) {
    if (user) {
        axios
            .get(api + `/cart?id=${user._id}`)
            .then((res) => {
                dispatch(setCart(res.data));
            })
            .catch((err) => message.error('Something went wrong! Please try again later.', 2));
    }
}

export default getCart;
