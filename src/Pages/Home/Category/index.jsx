import './index.scss';
import { faFilter, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenderCategory from '../../../Component/RenderCategory';
import RenderStar from '../../../Component/RenderStar';
import Button from '../../../Component/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setIndexActive, setPriceMax, setPriceMin } from '../../../features/apiCategory/apiCategorySlice';
import {
    setPriceMin as setPriceMinProduct,
    setPriceMax as setPriceMaxProduct,
    setURL,
    setClearState,
} from '../../../features/apiProduct/apiProductSlice';

function Category() {
    const dispatch = useDispatch();
    const inputPriceMin = useSelector((state) => state.apiCategory.price_min);
    const inputPriceMax = useSelector((state) => state.apiCategory.price_max);

    function checkValuePrice(e, type) {
        const regex = /^[0-9]+$/;

        if (regex.test(e.target.value)) {
            if (type === 'min') {
                dispatch(setPriceMin(parseInt(e.target.value)));
            } else {
                dispatch(setPriceMax(parseInt(e.target.value)));
            }
        } else if (e.target.value === '') {
            if (type === 'min') {
                dispatch(setPriceMin(''));
            } else {
                dispatch(setPriceMax(''));
            }
        } else {
            if (type === 'min') {
                e.target.value = inputPriceMin;
            } else {
                e.target.value = inputPriceMax;
            }
        }
    }

    return (
        <>
            <div className="home_category__title border-category">
                <FontAwesomeIcon className="icon" icon={faList} />
                Danh sách sản phẩm
            </div>
            <div className="home_catefory__list">
                <RenderCategory />
            </div>

            <div className="home_category-filter border-category">
                <FontAwesomeIcon className="icon" icon={faFilter} />
                Bộ lọc tìm kiếm
            </div>

            <div className="home_category-price border-category">
                Khoảng giá
                <div className="input__price">
                    <input
                        type="text"
                        placeholder="Từ"
                        onChange={(e) => {
                            checkValuePrice(e, 'min');
                        }}
                        value={inputPriceMin}
                    />
                    <span>-</span>
                    <input
                        type="text"
                        placeholder="Đến"
                        onChange={(e) => {
                            checkValuePrice(e, 'max');
                        }}
                        value={inputPriceMax}
                    />
                </div>
                <Button
                    className="btn__price"
                    text="Áp dụng"
                    onClick={() => {
                        if (inputPriceMax) {
                            if (inputPriceMin) {
                                if (inputPriceMin < 1 || inputPriceMax < 1) {
                                    return;
                                }
                                if (inputPriceMin > inputPriceMax) {
                                    return;
                                }
                            } else {
                                dispatch(setPriceMin(0));
                            }

                            dispatch(setPriceMinProduct(inputPriceMin));
                            dispatch(setPriceMaxProduct(inputPriceMax));
                            dispatch(setURL());
                        }
                    }}
                />
            </div>
            <div className="home_category-rating border-category">
                Đánh giá
                <RenderStar numberStar={5} />
                <RenderStar numberStar={4} />
                <RenderStar numberStar={3} />
                <RenderStar numberStar={2} />
                <RenderStar numberStar={1} />
            </div>

            <div className="border-category" style={{ borderBottom: 'none' }}>
                <Button
                    className="btn__price"
                    text="Xóa bộ lọc"
                    onClick={() => {
                        dispatch(setClearState());

                        dispatch(setIndexActive(''));
                        dispatch(setPriceMin(''));
                        dispatch(setPriceMax(''));
                        dispatch(setURL());
                    }}
                />
            </div>
        </>
    );
}

export default Category;
