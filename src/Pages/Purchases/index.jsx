import './index.scss';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getCart from '../../Component/getCart';
import Button from '../../Component/Button';
import { Input, message } from 'antd';
import PurchaseCart from './PurchaseCart';
import PurchaseInfo from './PurchaseInfo';
import { api } from '../../api';

function Purchases() {
    const valueChecked = useSelector((state) => state.cartSlice.valueChecked);
    const user = useSelector((state) => state.loginSlice.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (valueChecked.length <= 0) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueChecked.length]);

    const [infoEmty, setInfoEmty] = useState(false);

    const postPurchases = async () => {
        const orderProduct = valueChecked.map((item) => {
            return {
                id_product: item.id_product,
                quantity: item.quantity,
                name: item.name,
                price: item.price,
                image: item.image,
            };
        });

        if (!receiver.name || !receiver.phone || !receiver.address || !receiver.email || !user._id) {
            message.error('Vui lòng nhập đầy đủ thông tin', 2);
            return;
        }

        const newDate = new Date();

        axios
            .post(api + `/purchase`, {
                id_user: user._id,
                type: 1,
                name: receiver.name,
                phone: receiver.phone,
                address: receiver.address,
                email: receiver.email,
                message: note,
                totalQuantity: valueChecked.reduce((total, item) => {
                    const price = item.price * item.quantity;
                    return (total += price);
                }, 0),
                orderProduct: orderProduct,
                createdAt: newDate,
                updatedAt: newDate,
            })
            .then((res) => {
                message.success('Đặt hàng thành công', 2);
                setTimeout(() => {
                    getCart(user, dispatch);
                    navigate('/');
                    window.scrollTo(0, 0);
                }, 1000);
            })
            .catch((err) => {
                message.error('Đặt hàng thất bại', 2);
            });
    };

    const [receiver, setReceiver] = useState({
        name: user.name,
        phone: user.phone,
        address: user.address,
        email: user.email,
    });

    const [note, setNote] = useState('');
    const totalQuantity = valueChecked.reduce((total, item) => {
        const price = item.price * item.quantity;
        return (total += price);
    }, 0);

    const handleSubmit = (value) => {
        setInfoEmty(!infoEmty);
        if (infoEmty === true) {
            setReceiver(value);
        }
    };

    return (
        <div className="grid ">
            <div className="title">
                <div className="grid wide">
                    <h2>Thanh toán</h2>
                </div>
            </div>
            <div className="grid wide purchase">
                <PurchaseInfo handleSubmit={handleSubmit} receiver={receiver} infoEmty={infoEmty} />

                <PurchaseCart data={valueChecked} />

                <div className="purchase__message backgroud-white">
                    <span>Lưu ý cho người bán:</span>
                    <Input
                        placeholder="Nhập lời nhắn"
                        style={{ flex: 1 }}
                        onChange={(e) => {
                            setNote(e.target.value);
                        }}
                    />
                </div>
                <div className="purchase__total backgroud-white">
                    <div className="purchase__total--item">
                        <div className="purchase__total_item">
                            <span>Tổng tiền hàng:</span>
                            <span>
                                {totalQuantity.toLocaleString('en')}
                                <sup>vnđ</sup>
                            </span>
                        </div>

                        <div className="purchase__total_item">
                            <span>Phí vận chuyển:</span>
                            <span>
                                30.000
                                <sup>vnđ</sup>
                            </span>
                        </div>

                        <div className="purchase__total_item">
                            <span>Tổng thanh toán:</span>
                            <span className="color--primary ">
                                {(totalQuantity + 30000).toLocaleString('en')}
                                <sup>vnđ</sup>
                            </span>
                        </div>
                        <Button text="Đặt hàng" onClick={postPurchases} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Purchases;
