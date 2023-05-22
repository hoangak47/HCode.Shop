import axios from 'axios';
import { setUser } from '../../features/loginSlice';
import { api } from '../../api';
import { message } from 'antd';

function updateUser(values, user, dispatch) {
    const value = {
        ...values,
        id: user._id,
    };
    axios
        .post(api + `/user`, value)
        .then((res) => {
            dispatch(setUser(res.data));
        })
        .catch((err) => {
            message.error('Lỗi kết nối', 2);
        });
}

export default updateUser;
