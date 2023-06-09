import './index.scss';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PurchaseCart from '../Purchases/PurchaseCart';
import Button from '../../Component/Button';
import { api } from '../../api';
import { message } from 'antd';

function PurchasesDetail() {
    const navigate = useNavigate();

    const id = useSelector((state) => state.purchasesDetailSlice.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        if (!id) {
            navigate('/');
        }

        axios
            .get(api + `/purchase/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                message.error('Lỗi kết nối đến server!', 2);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="grid ">
            <div className="title">
                <div className="grid wide">
                    <h2>Chi tiết đơn hàng</h2>
                </div>
            </div>

            {data.length > 0 ? (
                <div className="grid wide ">
                    <div className="purchase-detail  backgroud-white">
                        <div className="purchase-detail-info ">
                            <div className="purchase-detail-info__title">
                                <h3>Thông tin đơn hàng</h3>

                                <div className="purchase-detail-info__title__status backgroud-white">
                                    <p>
                                        <span>Trạng thái: </span>
                                        <b
                                            className="status"
                                            style={
                                                data[0] === 1
                                                    ? { color: '#2db7f5' }
                                                    : data[0] === 2
                                                    ? { color: '#87d068' }
                                                    : data[0] === 3
                                                    ? { color: '#108ee9' }
                                                    : { color: '#f50' }
                                            }
                                        >
                                            {data[0].type === 1
                                                ? 'Đang xử lý'
                                                : data[0].type === 2
                                                ? 'Đang giao hàng'
                                                : data[0].type === 3
                                                ? 'Đã giao hàng'
                                                : 'Đã hủy'}
                                        </b>
                                    </p>

                                    <p>
                                        <span>Ngày đặt hàng: </span>
                                        <b className="date">{Date(data[0].date).slice(0, 15)}</b>
                                    </p>

                                    <p>
                                        <span>Người nhận: </span>
                                        <b className="name">{data[0].name}</b>
                                    </p>

                                    <p>
                                        <span>Số điện thoại: </span>
                                        <b className="phone">{data[0].phone}</b>
                                    </p>

                                    <p>
                                        <span>Email: </span>
                                        <b className="email">{data[0].email}</b>
                                    </p>

                                    {data[0].message && (
                                        <p>
                                            <span>Ghi chú: </span>
                                            <b className="note">{data[0].message}</b>
                                        </p>
                                    )}

                                    <p>
                                        <span>Địa chỉ nhận hàng: </span>
                                        <b className="address">{data[0].address}</b>
                                    </p>

                                    <p>
                                        <span>Thành tiền: </span>
                                        <b className="total color--primary">
                                            {data[0].totalQuantity.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </b>
                                    </p>
                                </div>
                                {data[0].type !== 4 && (
                                    <Button
                                        text="Hủy đơn hàng"
                                        onClick={() => {
                                            axios
                                                .put(api + `/purchase/${id}`, {
                                                    type: 4,
                                                })
                                                .then((res) => {
                                                    message.success('Hủy đơn hàng thành công', 2);
                                                    navigate(`/profile/${data[0].id_user}`);
                                                })
                                                .catch((err) => {
                                                    message.error('Lỗi kết nối đến server!', 2);
                                                });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <PurchaseCart data={data[0].orderProduct} />
                </div>
            ) : (
                <div className="grid wide backgroud-white ">loading...</div>
            )}
        </div>
    );
}

export default PurchasesDetail;
