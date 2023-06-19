import './index.scss';
import Button from '../../../Component/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setIndexSort, setOrder, setPage, setSortBy, setURL } from '../../../features/apiProduct/apiProductSlice';
import { useEffect } from 'react';
import RemoveError from '../../../Component/RemoveError';

function Filter() {
    const dispatch = useDispatch();
    const dataPage = useSelector((state) => state.apiProduct.data);

    const sortActive = document.querySelectorAll('.sort');
    const indexSortActive = useSelector((state) => state.apiProduct.sortIndex);

    RemoveError();
    useEffect(() => {
        if (sortActive.length < 1) return;
        sortActive.forEach((item, index) => {
            sortActive[index].classList.remove('active');
        });
        sortActive[indexSortActive].classList.add('active');
    }, [indexSortActive, sortActive]);

    return (
        <div className="home-filter">
            <div className="home-filter-left">
                <p>Sắp xếp theo</p>
                <Button
                    className="sort active"
                    text="Phổ Biến"
                    onClick={() => {
                        dispatch(setSortBy('view'));
                        dispatch(setIndexSort(0));
                        dispatch(setURL());
                    }}
                />
                <Button
                    className="sort"
                    text="Mới Nhất"
                    onClick={() => {
                        dispatch(setSortBy('createdAt'));
                        dispatch(setIndexSort(1));
                        dispatch(setURL());
                    }}
                />
                <Button
                    className="sort"
                    text="Bán Chạy"
                    onClick={() => {
                        dispatch(setSortBy('sold'));
                        dispatch(setIndexSort(2));
                        dispatch(setURL());
                    }}
                />
                <input
                    className="btn sort mobile"
                    type="checkbox"
                    onChange={(e) => {
                        dispatch(setIndexSort(3));
                        dispatch(setSortBy('price'));
                        if (e.target.checked) {
                            dispatch(setOrder('asc'));
                        }
                        if (!e.target.checked) {
                            dispatch(setOrder('desc'));
                        }
                        dispatch(setURL());
                    }}
                />
                <select
                    className="btn sort"
                    name="sort"
                    id="sort"
                    onChange={(e) => {
                        dispatch(setIndexSort(4));
                        dispatch(setSortBy('price'));
                        dispatch(setOrder(e.target.value));
                        dispatch(setURL());
                    }}
                >
                    <option selected={indexSortActive !== 4 && 'selected'} value disabled>
                        Giá
                    </option>
                    <option value="asc">Giá: Thấp đến Cao</option>
                    <option value="desc">Giá: Cao đến Thấp</option>
                </select>
            </div>
            <div className="home-filter-right">
                {dataPage && dataPage.pagination && (
                    <>
                        <div className="current-page">
                            <span className="active">{dataPage.pagination['page']}</span>
                            <span>/</span>
                            <span>{dataPage.pagination['page_size']}</span>
                        </div>
                        <div className="btn-group">
                            <Button
                                onClick={() => {
                                    if (dataPage.pagination['page'] > 1) {
                                        dispatch(setPage(dataPage.pagination['page'] - 1));
                                        dispatch(setURL());
                                    }
                                }}
                                className={dataPage.pagination['page'] !== 1 ? 'active btn-prev' : '  btn-prev'}
                                text="&lt;"
                            />
                            <Button
                                onClick={() => {
                                    if (dataPage.pagination['page'] < dataPage.pagination['page_size']) {
                                        dispatch(setPage(dataPage.pagination['page'] + 1));
                                        dispatch(setURL());
                                    }
                                }}
                                className={
                                    dataPage.pagination['page'] !== dataPage.pagination['page_size']
                                        ? 'active btn-next'
                                        : 'btn-next'
                                }
                                text="&gt;"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Filter;
