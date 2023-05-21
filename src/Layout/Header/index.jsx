import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Component/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setClearState, setIndexSort, setName, setURL } from '../../features/apiProduct/apiProductSlice';
import { setIndexActive } from '../../features/apiCategory/apiCategorySlice';
import { removeUser, setToggle, setUser } from '../../features/loginSlice';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import Img from '../../Component/Image';
import getCart from '../../Component/getCart';

function Header() {
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cookie = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const user = cookie.get('user');
        if (!user) {
            dispatch(setUser({}));
        }
    }, [cookie, dispatch]);

    const user = useSelector((state) => state.loginSlice.user);
    const cart = useSelector((state) => state.cartSlice.cart);
    useEffect(() => {
        getCart(user, dispatch);
    }, [dispatch, user]);

    const name = useSelector((state) => state.apiProduct.name);

    return (
        <header>
            <div className="header">
                <div className="grid wide">
                    <div className="header_navbar">
                        {Object.keys(user).length > 0 ? (
                            <>
                                <div className="user">
                                    <Img className="avatar" src={user.picture} alt="" />
                                    <span>{user.name}</span>

                                    <div className="user_dropdown triangle">
                                        <Link className="user_dropdown-item" to={`/profile/${user._id}`}>
                                            Thông tin cá nhân
                                        </Link>
                                        <Link
                                            className="user_dropdown-item"
                                            to="/"
                                            onClick={() => {
                                                dispatch(removeUser());
                                            }}
                                        >
                                            Đăng xuất
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="link btn-login"
                                    to="/login"
                                    onClick={() => {
                                        dispatch(setToggle(false));
                                    }}
                                >
                                    Đăng Nhập
                                </Link>
                                <Link
                                    className="link btn-register"
                                    to="/login"
                                    onClick={() => {
                                        dispatch(setToggle(true));
                                    }}
                                >
                                    Đăng Ký
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="header_search">
                        <Link
                            to={'/'}
                            className="logo-hcode"
                            onClick={() => {
                                dispatch(setClearState());
                                dispatch(setIndexSort(0));
                                dispatch(setURL());
                                dispatch(setIndexActive(''));
                            }}
                        >
                            <svg
                                width="50"
                                height="50"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.325 3.05011L8.66741 20.4323L10.5993 20.9499L15.2568 3.56775L13.325 3.05011Z"
                                    fill="#fff"
                                ></path>
                                <path
                                    d="M7.61197 18.3608L8.97136 16.9124L8.97086 16.8933L3.87657 12.1121L8.66699 7.00798L7.20868 5.63928L1.04956 12.2017L7.61197 18.3608Z"
                                    fill="#5fbcff"
                                ></path>
                                <path
                                    d="M16.388 18.3608L15.0286 16.9124L15.0291 16.8933L20.1234 12.1121L15.333 7.00798L16.7913 5.63928L22.9504 12.2017L16.388 18.3608Z"
                                    fill="#59C378"
                                ></path>
                            </svg>
                            <h1>HCode.dev</h1>
                        </Link>
                        <div className="header_search-input">
                            <input
                                type="text"
                                placeholder="Search"
                                value={name}
                                onChange={(e) => dispatch(setName(e.target.value))}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate('/');
                                        dispatch(setURL());
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    navigate('/');
                                    dispatch(setURL());
                                }}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                        {window.location.pathname === '/cart' ? (
                            ''
                        ) : (
                            <div className="header_cart">
                                <div
                                    onClick={() => {
                                        navigate('/cart');
                                    }}
                                    className="cart header_cart-icon"
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    {cart.length > 0 && <div className="count" data-count={cart.length}></div>}
                                </div>

                                {cart.length > 0 && (
                                    <div className="header_cart-list triangle">
                                        <div className="header_cart-list-item">
                                            {cart && cart.length > 0
                                                ? cart.map((item, index) => (
                                                      <div className="header_cart-item" key={index}>
                                                          <div className="header_cart-item-img">
                                                              <Img src={item.image} alt="" />
                                                          </div>
                                                          <div className="header_cart-item-info">
                                                              <p className="name-product header_cart-item-name">
                                                                  {item.name}
                                                              </p>
                                                              <div className="header_cart-item-info-price">
                                                                  <p>
                                                                      {item.price.toLocaleString('vi-VN', {
                                                                          style: 'currency',
                                                                          currency: 'VND',
                                                                      })}
                                                                  </p>
                                                                  <p>&times;</p>
                                                                  <p>{item.quantity}</p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  ))
                                                : ''}
                                        </div>

                                        <Link to="/cart" className="btn-cart">
                                            <Button text={'Xem giỏ hàng'} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
