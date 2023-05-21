import './index.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setLoading } from '../../features/apiProduct/apiProductSlice';
import { Link } from 'react-router-dom';
import { setID } from '../../features/apiDetailProduct';
import RenderRating from '../RenderRating';

function RenderProduct() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.apiProduct.data);
    const sort_by = useSelector((state) => state.apiProduct.sort_by);
    const url = useSelector((state) => state.apiProduct.url);
    const loading = useSelector((state) => state.apiProduct.loading);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, sort_by]);

    //function skeleton
    function skeletonProduct() {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push(
                <div key={i} className="product-item">
                    <div className="product__img">
                        <div className="skeleton-img"></div>
                    </div>
                    <div className="product-content">
                        <div className="product__name">
                            <div className="skeleton-name"></div>
                        </div>
                        <div className="product__price">
                            <span className="price product__price-old">
                                <div className="skeleton-price"></div>
                            </span>
                            <span className="price product__price-new">
                                <div className="skeleton-price"></div>
                            </span>
                        </div>

                        <div className="product-rating">
                            <span className="sold">
                                <div className="skeleton-sold"></div>
                            </span>
                            <div>
                                <div className="skeleton-rating"></div>
                            </div>
                        </div>
                    </div>
                </div>,
            );
        }
        return result;
    }

    return loading ? (
        skeletonProduct()
    ) : data.products && data.products.length > 0 ? (
        data.products.map((item, index) => (
            <div
                key={index}
                className="product-item"
                onClick={() => {
                    dispatch(setID(item._id));
                }}
            >
                <Link to={`/product/${item.name.replace(/\s/g, '_').replace(/[/%]/g, '-')}/${item._id}`}>
                    <div className="product__img">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="product-content">
                        <div className="product__name">{item.name}</div>
                        <div className="product__price">
                            <span className="price product__price-old">
                                {item.price_before_discount.toLocaleString('en')} <sup>đ</sup>
                            </span>
                            <span className="price product__price-new">
                                {item.price.toLocaleString('en')} <sup>đ</sup>
                            </span>
                        </div>

                        <div className="product-rating">
                            <span className="sold">
                                Đã bán {item.sold > 1000 ? (item.sold / 1000).toFixed(1) + 'k' : item.sold} &nbsp;
                            </span>
                            <div>
                                <RenderRating index={item.rating} />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ))
    ) : (
        <div className="" style={{ width: '100%', margin: '50px 50px' }}>
            Không có sản phẩm nào
        </div>
    );
}

export default RenderProduct;
