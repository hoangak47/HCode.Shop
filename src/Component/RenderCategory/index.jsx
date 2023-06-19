import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setIndexActive } from '../../features/apiCategory/apiCategorySlice';
import {
    setSortBy,
    setURL,
    setCategory as setCategoryProducts,
    setIndexSort,
    setPage,
} from '../../features/apiProduct/apiProductSlice';
import { message } from 'antd';

function RenderCategory() {
    const urlC = useSelector((state) => state.apiCategory.url);
    const category = useSelector((state) => state.apiCategory.categories);
    const indexActive = useSelector((state) => state.apiCategory.indexActive);
    const dispatch = useDispatch();

    useEffect(() => {
        axios(urlC)
            .then((res) => {
                dispatch(setCategory(res.data));
            })
            .catch((err) => {
                message.error('Không thể lấy dữ liệu', 2);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlC]);

    return (
        <ul>
            {category.map((item, index) => {
                return (
                    <li
                        className={indexActive === index ? 'active' : ''}
                        onClick={(e) => {
                            dispatch(setSortBy('view'));
                            if (indexActive === index) {
                                dispatch(setIndexActive(''));
                                dispatch(setCategoryProducts(''));
                                dispatch(setURL());
                            } else {
                                dispatch(setCategoryProducts(e.target.dataset.id));
                                dispatch(setIndexActive(index));
                                dispatch(setPage(1));
                                dispatch(setURL());
                            }
                            dispatch(setIndexSort(0));
                        }}
                        data-id={item._id}
                        data={item.id}
                        key={index}
                    >
                        {item.name}
                    </li>
                );
            })}
        </ul>
    );
}

export default RenderCategory;
