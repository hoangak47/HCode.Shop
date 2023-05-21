import './index.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setRatingFilter, setURL } from '../../features/apiProduct/apiProductSlice';
import { setindexActiveRating } from '../../features/apiCategory/apiCategorySlice';

function RenderStar({ numberStar = 5 }) {
    const [star, setStar] = useState([]);

    const dispatch = useDispatch();
    const index = useSelector((state) => state.apiCategory.indexActiveRating);

    useEffect(() => {
        const star = [];
        for (let i = 0; i < numberStar; i++) {
            star.push(
                <FontAwesomeIcon
                    key={i}
                    className="icon-rating"
                    icon={faStar}
                    style={{ color: 'rgb(255, 206, 61)' }}
                />,
            );
        }
        for (let i = 0; i < 5 - numberStar; i++) {
            star.push(
                <FontAwesomeIcon key={5 - i} className="icon-rating" icon={faStar} style={{ color: '#D6D6D6' }} />,
            );
        }
        setStar(star);
    }, [numberStar]);

    return (
        <div
            onClick={() => {
                dispatch(setRatingFilter(numberStar));
                dispatch(setPage(1));
                dispatch(setindexActiveRating(numberStar));
                dispatch(setURL());
            }}
            className={index === numberStar ? 'rating__filter active' : 'rating__filter'}
        >
            <div className="rating__filter__star">{star}</div>
            {numberStar < 5 && <span>trở lên</span>}
        </div>
    );
}

export default RenderStar;
