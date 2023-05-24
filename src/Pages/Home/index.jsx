import './home.scss';

import RenderProduct from '../../Component/RenderProduct';
import Category from './Category';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { setPage, setURL } from '../../features/apiProduct/apiProductSlice';

function Home() {
    const data = useSelector((state) => state.apiProduct.data);
    const page = useSelector((state) => state.apiProduct.page);
    const page_size = Object.keys(data).length > 0 ? data.pagination.page_size : 0;

    const dispatch = useDispatch();

    const handlePage = (page) => {
        dispatch(setPage(page));
        dispatch(setURL());
    };
    return (
        <div className="home grid wide ">
            <div className="row">
                <div className="home_category">
                    <Category />
                </div>
                <div className="home__filter">
                    <Filter />
                    <div className="product-list">
                        <RenderProduct />
                    </div>
                    <div className="page-number">
                        <div
                            className="page-number__item"
                            onClick={() => {
                                if (page > 1) {
                                    handlePage(page - 1);
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        {page === 2 && page_size > 2 && (
                            <div
                                className="page-number__item"
                                onClick={() => {
                                    handlePage(1);
                                }}
                            >
                                1
                            </div>
                        )}
                        {page > 2 && page_size > 3 && (
                            <>
                                <div
                                    className="page-number__item"
                                    onClick={() => {
                                        handlePage(1);
                                    }}
                                >
                                    1
                                </div>
                                <div className="page-number__item more">...</div>
                            </>
                        )}

                        {page_size > 3 && page === page_size - 1 && (
                            <div
                                className="page-number__item"
                                onClick={() => {
                                    handlePage(page - 2);
                                }}
                            >
                                {page_size - 2}
                            </div>
                        )}
                        {page !== page_size && page - 1 > 1 && page < page_size - 2 && (
                            <>
                                <div
                                    className="page-number__item"
                                    onClick={() => {
                                        handlePage(page - 1);
                                    }}
                                >
                                    {page - 1}
                                </div>
                            </>
                        )}
                        {page !== page_size && (
                            <>
                                <div className="page-number__item active">{page}</div>
                            </>
                        )}
                        {page < page_size - 1 && (
                            <div
                                className="page-number__item"
                                onClick={() => {
                                    handlePage(page + 1);
                                }}
                            >
                                {page + 1}
                            </div>
                        )}
                        {page_size > 3 && page < page_size - 2 && <div className="page-number__item more">...</div>}
                        {page === page_size && (
                            <>
                                <div
                                    className="page-number__item"
                                    onClick={() => {
                                        handlePage(page - 2);
                                    }}
                                >
                                    {page_size - 2}
                                </div>
                                <div
                                    className="page-number__item"
                                    onClick={() => {
                                        handlePage(page - 1);
                                    }}
                                >
                                    {page_size - 1}
                                </div>
                            </>
                        )}
                        <div
                            className={page === page_size ? 'page-number__item active' : 'page-number__item'}
                            onClick={() => {
                                handlePage(page_size);
                            }}
                        >
                            {page_size}
                        </div>
                        <div
                            className="page-number__item"
                            onClick={() => {
                                if (page < page_size) {
                                    handlePage(page + 1);
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
