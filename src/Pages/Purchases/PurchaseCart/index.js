import { useNavigate } from 'react-router-dom';
import Img from '../../../Component/Image';
import { useDispatch } from 'react-redux';
import { setID } from '../../../features/apiDetailProduct';

function PurchaseCart({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="purchase__cart backgroud-white">
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                    </tr>
                </thead>

                <tbody>
                    {data &&
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className="cart__item">
                                            <Img src={item.image} alt="" className="cart__img" />
                                            <div
                                                className="cart__item__info"
                                                onClick={() => {
                                                    dispatch(setID(item.id_product));
                                                    navigate(
                                                        `/product/${item.name
                                                            .replace(/\s/g, '_')
                                                            .replace(/[/%]/g, '-')}/${item.id_product}`,
                                                    );
                                                }}
                                            >
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.price.toLocaleString('en')} <sup>vnđ</sup>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <b className="color--primary">
                                            {(item.price * item.quantity).toLocaleString('en')} <sup>vnđ</sup>
                                        </b>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default PurchaseCart;
