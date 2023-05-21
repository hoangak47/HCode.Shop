import './index.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../features/apiProduct/apiProductSlice';
import axios from 'axios';
import { setData, setID } from '../../features/apiDetailProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import RenderRating from '../../Component/RenderRating';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import getCart from '../../Component/getCart';
import { api } from '../../api';

function DetailProduct() {
    const dispatch = useDispatch();
    const url = useSelector((state) => state.apiDetailProduct.url);
    const data = useSelector((state) => state.apiDetailProduct.data);
    const _id = useSelector((state) => state.apiDetailProduct.id);
    const user = useSelector((state) => state.loginSlice.user);

    const navigation = useNavigate();

    const loading = useSelector((state) => state.apiProduct.loading);
    if (!_id) {
        dispatch(setID(window.location.pathname.split('/')[3]));
    }
    useEffect(() => {
        dispatch(setLoading(true));
        axios(url)
            .then((res) => {
                dispatch(setLoading(false));
                dispatch(setData(res.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setLoading(false));
            });

        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const [active, setActive] = useState(0);

    function handleActiveImage(index) {
        const img = document.querySelector('.img-product');
        img.src = data.images[index];
    }

    const [btn_control, setBtnControl] = useState(0);
    function btnControl(target) {
        if (target === 'prev') {
            if (btn_control > 0) {
                setBtnControl(btn_control - 1);
            }
        } else {
            if (btn_control < data.images.length - 6) {
                setBtnControl(btn_control + 1);
            }
        }
    }

    const [value_quality, setValueQuality] = useState(1);
    function handleQuality(target) {
        if (target === 'minus') {
            if (value_quality > 1) {
                setValueQuality(value_quality - 1);
            }
        } else {
            if (value_quality < data.quantity) {
                setValueQuality(value_quality + 1);
            }
        }
    }

    const [activeMore, setActiveMore] = useState(false);
    function handleClickMore() {
        setActiveMore(!activeMore);
    }

    const [messageApi, contextHolder] = message.useMessage();

    const success = (text) => {
        messageApi.open({
            duration: 2,
            type: 'success',
            content: text,
        });
    };

    const error = (text) => {
        messageApi.open({
            duration: 2,
            type: 'error',
            content: text,
        });
    };

    const [data_quality, setDataQuality] = useState(0);

    useEffect(() => {
        setDataQuality(data.quantity);
    }, [data]);

    const handleAddToCart = (data) => {
        const dataUptoCart = [
            {
                id_user: user._id,
                id_product: data._id,
                quantity: value_quality,
                price: data.price,
                name: data.name,
                image: data.image,
                createdAt: new Date(),
                quantityProduct: data.quantity,
            },
        ];
        if (user && user._id) {
            axios
                .post(api + `/cart`, {
                    ...dataUptoCart[0],
                })
                .then((res) => {
                    success(res.data.message);
                    setValueQuality(1);
                    setDataQuality(data_quality - value_quality);
                    getCart(user, dispatch);
                })
                .catch((err) => {
                    error(err.response.data.message);
                });
        } else {
            error('Please login to continue');
            setTimeout(() => {
                navigation('/login');
            }, 2000);
        }
    };

    return (
        <div className="grid wide detail">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="detail-product">
                    {data && (
                        <>
                            <div className="row">
                                <div className="col l-5 m-12">
                                    <div className="grid">
                                        <div className="row">
                                            <div className="col l-12">
                                                <img
                                                    src={data.images && data.images[active]}
                                                    alt=""
                                                    className="img-product"
                                                />
                                            </div>
                                            <div className="img-product-list col l-12">
                                                <div className="grid">
                                                    <div className="row">
                                                        {data.images &&
                                                            data.images.map((item, index) => (
                                                                <div key={index} className="col l-2-4">
                                                                    <img
                                                                        src={item}
                                                                        alt=""
                                                                        className={
                                                                            index === active
                                                                                ? 'img-product-item active'
                                                                                : 'img-product-item '
                                                                        }
                                                                        onClick={() => {
                                                                            setActive(index);
                                                                            handleActiveImage(index);
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        <div
                                                            className="btn-control btn-prev"
                                                            onClick={() => {
                                                                btnControl('prev');
                                                                document.querySelectorAll('.img-product-list .col')[
                                                                    btn_control
                                                                ].style.marginLeft = null;
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleLeft} />
                                                        </div>
                                                        <div
                                                            className="btn-control btn-next"
                                                            onClick={() => {
                                                                btnControl('next');
                                                                document.querySelectorAll('.img-product-list .col')[
                                                                    btn_control
                                                                ].style.marginLeft = '-20%';
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleRight} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-7 m-12">
                                    <div className="detail-product-info">
                                        <div className="detail-product-info__name">{data.name}</div>

                                        <div className="detail-product-info__status">
                                            <span className="detail-product-info__status-rating">{data.rating}</span>
                                            &nbsp;&nbsp;
                                            <RenderRating index={data.rating} color="var(--color-primary)" />
                                            &nbsp;&nbsp;| &nbsp;&nbsp;
                                            <span>
                                                {data.sold > 1000 ? (data.sold / 1000).toFixed(1) + 'k' : data.sold} đã
                                                bán
                                            </span>
                                        </div>
                                        <div className="detail-product-info__price">
                                            <span className="product__price-old detail-product-info__price-old">
                                                {data.price_before_discount &&
                                                    data.price_before_discount.toLocaleString('en')}
                                                <sup>vnđ</sup>
                                            </span>
                                            <span className="product__price-new detail-product-info__price-new">
                                                {data.price && data.price.toLocaleString('en')} <sup>vnđ</sup>
                                            </span>
                                            <span className="detail-product-info__price-discount">
                                                Giảm {Math.round(100 - (data.price * 100) / data.price_before_discount)}
                                                %
                                            </span>
                                        </div>
                                        <div className="detail-product-quality">
                                            <div className="detail-product-quality__title">Số lượng</div>
                                            <div className="detail-product-quality__control">
                                                <button
                                                    className="detail-product-quality__control-btn"
                                                    onClick={() => {
                                                        handleQuality('minus');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <input
                                                    type="text"
                                                    className="detail-product-quality__control-input"
                                                    value={value_quality}
                                                    onChange={(e) => {
                                                        if (e.target.value > 0 && e.target.value <= data.quantity) {
                                                            setValueQuality(Number(e.target.value));
                                                        }
                                                    }}
                                                />
                                                <button
                                                    className="detail-product-quality__control-btn"
                                                    onClick={() => {
                                                        handleQuality('plus');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                            <div className="detail-product-quality__remain">
                                                {data_quality > 0 ? data_quality + ' sản phẩm có sẵn' : 'Hết hàng'}
                                            </div>
                                        </div>
                                        <div className="detail-product-info__btn">
                                            <button
                                                onClick={() => handleAddToCart(data)}
                                                className="detail-product-info__btn-add"
                                            >
                                                {contextHolder}
                                                <FontAwesomeIcon icon={faCartShopping} />
                                                <span>Thêm vào giỏ hàng</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="l-12">
                                    <div className="detail-product-description">
                                        <div className="detail-product-description__title">Mô tả sản phẩm</div>
                                        <div
                                            className={
                                                activeMore
                                                    ? 'detail-product-description__content active'
                                                    : 'detail-product-description__content'
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: data.description,
                                            }}
                                        ></div>
                                        <button
                                            className="detail-product-description__btn"
                                            onClick={() => handleClickMore()}
                                        >
                                            {activeMore ? 'Thu gọn' : 'Xem thêm'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default DetailProduct;
