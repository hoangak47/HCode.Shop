import { useState } from 'react';
import './index.scss';

function Tabs({ items, onChange }) {
    const [indexActive, setActiveIndex] = useState(0);

    return (
        <div className="tabs">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`tabs__item ${indexActive === index ? 'tabs__item--active' : ''}`}
                    onClick={() => {
                        setActiveIndex(index);
                        onChange(item.key);
                    }}
                >
                    {item.title}
                </div>
            ))}
        </div>
    );
}

export default Tabs;
