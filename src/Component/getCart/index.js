import axios from 'axios';

import { setCart } from '../../features/cartSlice';
import { api } from '../../api';

function getCart(user, dispatch) {
    if (user) {
        axios
            .get(api + `/cart?id=${user._id}`)
            .then((res) => {
                dispatch(setCart(res.data));
            })
            .catch((err) => console.log(err));
    }
}

export default getCart;
