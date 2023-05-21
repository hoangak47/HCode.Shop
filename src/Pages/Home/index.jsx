import './home.scss';

import RenderProduct from '../../Component/RenderProduct';
import Category from './Category';
import Filter from './Filter';

function Home() {
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
                </div>
            </div>
        </div>
    );
}

export default Home;
