import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import Tabs from '../../../Component/Tabs';
import { useEffect } from 'react';
import { setKey, setLoading, setPurchaseOrder } from '../../../features/purchaseOrderSlice';
import axios from 'axios';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setId } from '../../../features/purchasesDetailSlice';
import { api } from '../../../api';

function PurchaseOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchaseOrder = useSelector((state) => state.purchaseOrderSlice.purchaseOrder);
    const key = useSelector((state) => state.purchaseOrderSlice.key);
    const loading = useSelector((state) => state.purchaseOrderSlice.loading);
    const user = useSelector((state) => state.loginSlice.user);

    useEffect(() => {
        dispatch(setLoading(true));
        const params = {
            id: user._id,
            type: key,
        };

        axios
            .get(api + `/purchase`, {
                params,
            })
            .then((res) => {
                setTimeout(() => {
                    dispatch(setLoading(false));
                    dispatch(setPurchaseOrder(res.data));
                }, 500);
            })
            .catch((err) => {
                dispatch(setLoading(false));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const onChange = (key) => {
        dispatch(setKey(key));
    };
    const items = [
        {
            title: 'Tất cả',
            key: 0,
        },
        {
            title: 'Chờ xác nhận',
            key: 1,
        },
        {
            title: 'Đang giao',
            key: 2,
        },
        {
            title: 'Đã giao',
            key: 3,
        },
        {
            title: 'Đã hủy',
            key: 4,
        },
    ];

    const Loading = () => (
        <div className="purchase-order__loading">
            <div className="row purchase-order__loading--item">
                <div className="col l-4 m-12 flex align-center justify-center">
                    <div className="purchase-order__loading--img">
                        <div className="loading"></div>
                    </div>
                </div>
                <div className="col l-8 m-12 flex align-center justify-center" style={{ marginTop: 20 }}>
                    <div className="purchase-order__loading--info">
                        <div className="loading"></div>
                    </div>
                </div>
            </div>

            <div className="row purchase-order__loading--item">
                <div className="col l-6">
                    <div className="purchase-order__loading--quantity ">
                        <div className="loading"></div>
                    </div>
                </div>
                <div className="col l-6" style={{ display: 'flex', justifyContent: 'end' }}>
                    <div className="purchase-order__loading--total-price">
                        <div className="loading"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Tabs items={items} onChange={onChange} />
            <div className="purchase-order grid">
                {loading ? (
                    <>
                        <Loading />
                        <Loading />
                        <Loading />
                        <Loading />
                    </>
                ) : purchaseOrder.length > 0 ? (
                    purchaseOrder.map((item, index) => {
                        return (
                            <div
                                className="row purchase-order__body--item "
                                key={index}
                                onClick={() => {
                                    dispatch(setId(item._id));
                                    navigate(`/purchases/${item._id}`);
                                }}
                            >
                                <div className="status">
                                    {item.type === 1 ? (
                                        <Tag color="#2db7f5">Chờ xác nhận</Tag>
                                    ) : item.type === 2 ? (
                                        <Tag color="#87d068">Đang giao</Tag>
                                    ) : item.type === 3 ? (
                                        <Tag color="#108ee9">Đã giao</Tag>
                                    ) : (
                                        <Tag color="#f50">Đã hủy</Tag>
                                    )}
                                </div>
                                <div className="col l-12">
                                    <div className="purchase-order__body--info">
                                        <img src={item.orderProduct[0].image} alt="" />
                                        <div>
                                            <div className="purchase-order__body--info--name">
                                                {item.orderProduct[0].name}
                                            </div>
                                            <div className="purchase-order__body--info--quantity">
                                                1 x{' '}
                                                {item.orderProduct[0].price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-12 purchase-order__body--total">
                                    <div className="purchase-order__body--quantity">
                                        Đơn hàng có {item.orderProduct.length} sản phẩm
                                    </div>
                                    <div className="purchase-order__body--info--total-price">
                                        Tổng tiền:{' '}
                                        {item.totalQuantity.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="purchase-order__body--empty">Không có đơn hàng nào</div>
                )}
            </div>
        </>
    );
}

export default PurchaseOrder;
