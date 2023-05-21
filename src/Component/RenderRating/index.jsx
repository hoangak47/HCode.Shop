import './index.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RenderRating({ index = 5, color = 'rgb(255, 206, 61)' }) {
    function take_decimal_number(num, n) {
        let base = 10 ** n;
        let result = Math.round(num * base) / base;
        return result;
    }
    const odd = index % 1;
    const width = take_decimal_number(odd, 2) * 100;
    let result = [];

    for (let i = 0; i < index; i++) {
        result.push(
            <div key={i}>
                <div className="icon-rating__star-fake">
                    <FontAwesomeIcon key={i} className="icon-rating" icon={faStar} style={{ color: color }} />
                </div>
                <FontAwesomeIcon key={i} className="icon-rating" icon={faStar} style={{ color: color }} />
            </div>,
        );
    }
    for (let i = 0; i < 5 - index; i++) {
        result.push(
            <div key={i + 5}>
                <div className="icon-rating__star-fake" style={{ width: width + '%' }}>
                    <FontAwesomeIcon key={i} className="icon-rating" icon={faStar} style={{ color: color }} />
                </div>
                <FontAwesomeIcon key={i + 5} className="icon-rating" icon={faStar} style={{ color: '#D6D6D6' }} />
            </div>,
        );
    }

    return <div className="icon-rating__star">{result}</div>;
}

export default RenderRating;
