import axios from 'axios';
import { setUser } from '../../features/loginSlice';
import { api } from '../../api';
import { message } from 'antd';
import { setLoadingSpinner } from '../../features/apiProduct/apiProductSlice';

function updateUser(values, user, dispatch) {
    const value = {
        ...values,
        id: user._id,
    };

    dispatch(setLoadingSpinner(true));
    setTimeout(() => {
        axios
            .post(api + `/user`, value)
            .then((res) => {
                dispatch(setLoadingSpinner(false));
                dispatch(setUser(res.data[0]));
            })
            .catch((err) => {
                message.error('Lỗi kết nối', 2);
            });
    }, 1000);
}

export default updateUser;
