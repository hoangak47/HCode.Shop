import axios from 'axios';
import { setUser } from '../../features/loginSlice';
import { api } from '../../api';

function updateUser(values, user, dispatch, success) {
    const value = {
        ...values,
        id: user._id,
    };
    axios
        .post(api + `/user`, value)
        .then((res) => {
            dispatch(setUser(res.data));
            success && success();
        })
        .catch((err) => {
            console.log(err.message);
        });
}

export default updateUser;
