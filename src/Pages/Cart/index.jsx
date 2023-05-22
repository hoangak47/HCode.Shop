import { useEffect } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Img from '../../Component/Image';
import Button from '../../Component/Button';
import getCart from '../../Component/getCart';
import axios from 'axios';
import { message } from 'antd';
import { setValueChecked } from '../../features/cartSlice';
import { setID } from '../../features/apiDetailProduct';
import { api } from '../../api';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cartSlice.cart);
    const user = useSelector((state) => state.loginSlice.user);
    useEffect(() => {
        if (user && Object.keys(user).length === 0) {
            navigate('/login');
            return;
        }
    }, [user, navigate]);

    const valueChecked = useSelector((state) => state.cartSlice.valueChecked);
    useEffect(() => {
        dispatch(setValueChecked([]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleChecked = (e) => {
        if (e.target.checked) {
            cart.forEach((item) => {
                if (item._id === e.target.attributes['data-value'].value) {
                    dispatch(setValueChecked([...valueChecked, item]));
                }
            });
        } else {
            cart.forEach((item) => {
                if (item._id === e.target.attributes['data-value'].value) {
                    dispatch(
                        setValueChecked(
                            valueChecked.filter((item) => item._id !== e.target.attributes['data-value'].value),
                        ),
                    );
                }
            });
        }

        const inputs = document.querySelectorAll('.cart__item input[type="checkbox"]');
        let count = 0;
        inputs.forEach((item) => {
            if (item.checked) {
                count++;
            }
        });

        if (count === inputs.length) {
            document.querySelector('.checkInputAll  input[type="checkbox"]').checked = true;
        } else {
            document.querySelector('.checkInputAll  input[type="checkbox"]').checked = false;
        }
    };

    const handleCheckedAll = (e) => {
        const inputs = document.querySelectorAll('.cart__item input[type="checkbox"]');
        if (e.target.checked) {
            dispatch(setValueChecked(cart));
            inputs.forEach((item) => {
                item.checked = true;
            });
        } else {
            dispatch(setValueChecked([]));

            inputs.forEach((item) => {
                item.checked = false;
            });
        }
    };

    const handlePlus = (item) => {
        axios
            .put(api + `/cart`, {
                id: item._id,
                quantity: item.quantity + 1,
            })
            .then((res) => {
                getCart(user, dispatch);
            })
            .catch((err) => {
                message.error(err.response.data.message || 'Lỗi', 2);
            });
    };

    const handleMinus = (item) => {
        if (item.quantity === 1) {
            message.error('Số lượng phải lớn hơn 0' || 'Lỗi', 2);
            return;
        }
        axios
            .put(api + `/cart`, {
                id: item._id,
                quantity: item.quantity - 1,
            })
            .then((res) => {
                getCart(user, dispatch);
            })
            .catch((err) => {
                message.error(err.response.data.message || 'Lỗi', 2);
            });
    };

    async function handleDelete(item, index) {
        document.querySelectorAll('.delete')[index].disabled = true;

        await axios
            .delete(api + `/cart`, {
                data: {
                    id: item._id,
                    id_product: item.id_product,
                    quantity: item.quantity,
                },
            })
            .then((res) => {
                message.success('Xóa thành công', 2);
                getCart(user, dispatch);
                document.querySelectorAll('.delete')[index].disabled = false;
            })
            .catch((err) => {
                message.error(err.response.data.message || 'Lỗi', 2);
                document.querySelectorAll('.delete')[index].disabled = false;
            });
    }

    return (
        <div className="grid ">
            <div className="title">
                <div className="grid wide">
                    <h2>Giỏ hàng</h2>
                </div>
            </div>

            {cart.length === 0 ? (
                <div className="grid wide cart">
                    <div className="row">
                        <div className="col l-12 m-12 c-12">
                            <div className="cart__empty backgroud-white">
                                <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                                <Button
                                    text="
                                    Tiếp tục mua sắm"
                                    onClick={() => navigate('/')}
                                    className="btn btn--primary"
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid wide cart">
                    <div className="row table__cart">
                        <div className="col l-12 m-12 c-12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="cart__item">
                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) => {
                                                            handleChecked(e);
                                                        }}
                                                        data-value={item._id}
                                                    />
                                                    <Img src={item.image} alt="" className="cart__img" />
                                                    <div
                                                        className="cart__item__info"
                                                        onClick={() => {
                                                            dispatch(setID(item.id_product));
                                                            navigate(
                                                                `/product/${item.name
                                                                    .replace(/\s/g, '_')
                                                                    .replace(/[/%]/g, '-')}/${item._id}`,
                                                            );
                                                        }}
                                                    >
                                                        <p>{item.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {item.price.toLocaleString('en')} <sup>vnđ</sup>
                                            </td>
                                            <td>
                                                <div className="cart__item__quantity">
                                                    <button onClick={() => handleMinus(item)}>-</button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const regex = /^[0-9]*$/;
                                                            if (!regex.test(e.target.value)) {
                                                                e.target.value = e.target.value.slice(0, -1);
                                                                return;
                                                            }
                                                            if (e.target.value < 1) {
                                                                e.target.value = 1;
                                                                return;
                                                            }

                                                            axios
                                                                .put(api + `/cart`, {
                                                                    id: item._id,
                                                                    quantity: parseInt(e.target.value),
                                                                })
                                                                .then((res) => {
                                                                    getCart(user, dispatch);
                                                                })
                                                                .catch((err) => {
                                                                    message.error(
                                                                        err.response.data.message || 'Lỗi',
                                                                        2,
                                                                    );
                                                                });
                                                        }}
                                                    />
                                                    <button onClick={() => handlePlus(item)}>+</button>
                                                </div>
                                            </td>
                                            <td>
                                                <b className="color--primary">
                                                    {(item.price * item.quantity).toLocaleString('en')} <sup>vnđ</sup>
                                                </b>
                                            </td>
                                            <td>
                                                <Button
                                                    style={{ padding: '1rem' }}
                                                    text={'Xóa'}
                                                    className="delete"
                                                    onClick={() => handleDelete(item, index)}
                                                ></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row table__cart--total grid wide">
                        <div className="col l-12 m-12 c-12 flex justify-between">
                            <div className="checkInputAll flex align-center">
                                <input type="checkbox" onChange={handleCheckedAll} />
                                <p>Chọn tất cả</p>
                            </div>
                            <div className="cart__total flex align-center ">
                                <div className="cart__total__item flex align-center">
                                    <p>Tổng thanh toán</p>
                                    {valueChecked.length > 0 ? (
                                        <p className="color--primary">
                                            {valueChecked
                                                .reduce((total, item) => {
                                                    const price = item.price * item.quantity;
                                                    return (total += price);
                                                }, 0)
                                                .toLocaleString('en')}
                                            <sup>vnđ</sup>
                                        </p>
                                    ) : (
                                        <p className="color--primary">
                                            0 <sup>vnđ</sup>
                                        </p>
                                    )}
                                </div>
                                <div className="cart__total__btn">
                                    <Button
                                        text={'Mua hàng'}
                                        onClick={() => {
                                            if (valueChecked.length === 0) {
                                                message.error('Vui lòng chọn sản phẩm', 2);
                                                return;
                                            }

                                            navigate('/purchases');
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
