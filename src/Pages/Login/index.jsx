import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setClearState, setIndexSort, setURL } from '../../features/apiProduct/apiProductSlice';
import { setIndexActive } from '../../features/apiCategory/apiCategorySlice';
import { SVGEyeClose, SVGEyeOpen, SVGLogoLogin } from '../../Component/SVG';
import ButTon from '../../Component/Button';
import { useRef, useState } from 'react';
import { setToggle, setUser } from '../../features/loginSlice';
import SaveLocalStore from '../../Component/SaveLocalStore';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { api } from '../../api';

function Login() {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const toggle = useSelector((state) => state.loginSlice.toggle);

    const valueCheckbox = useRef(null);
    let navigate = useNavigate();

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return (
        <div className="login">
            <header className="header">
                <div className="grid wide">
                    <div className="login__title">
                        <div className="login__logo">
                            <div className="logo">
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
                            </div>
                        </div>
                    </div>
                    <div className="login__help">
                        <p>Cần trợ giúp</p>
                    </div>
                </div>
            </header>
            <main className="main">
                <div className="grid wide">
                    <div className="row login__content">
                        <div className="col l-6 m-0 left">
                            <SVGLogoLogin width={140} height={200} />
                        </div>
                        <div className="col l-6 m-12 right">
                            <div className="login__form">
                                <div className={toggle ? 'login__form-content active' : 'login__form-content '}>
                                    <div className="login__form-login">
                                        <div className="login__title">
                                            <h2>Đăng nhập</h2>
                                        </div>
                                        <div className="login__form-input">
                                            <input type="email" id="email" placeholder="Email" />
                                        </div>
                                        <div className="login__form-input">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                placeholder="Mật khẩu"
                                            />
                                            {showPassword ? (
                                                <div
                                                    onClick={() => {
                                                        setShowPassword(false);
                                                    }}
                                                >
                                                    <SVGEyeOpen width={20} classs="eye" />
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        setShowPassword(true);
                                                    }}
                                                >
                                                    <SVGEyeClose width={20} classs="eye" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="login__form-input">
                                            <input
                                                ref={valueCheckbox}
                                                type="checkbox"
                                                id="remember"
                                                onClick={() => {
                                                    SaveLocalStore('remember', valueCheckbox.current.checked);
                                                }}
                                            />
                                            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                                        </div>
                                        <div className="login__form-input">
                                            <ButTon
                                                text="Đăng nhập"
                                                onClick={() => {
                                                    const email = document.getElementById('email').value;
                                                    const password = document.getElementById('password').value;

                                                    if (!regexEmail.test(email)) {
                                                        alert('Email không hợp lệ');
                                                        return;
                                                    }

                                                    axios
                                                        .post(api + `/login`, {
                                                            type: 'normal',
                                                            email: email,
                                                            password: password,
                                                        })
                                                        .then((res) => {
                                                            dispatch(setUser(res.data));
                                                            navigate('/');
                                                        })
                                                        .catch((err) => {
                                                            alert(err.response.data);
                                                        });
                                                }}
                                            />
                                            <div className="login__google">
                                                <GoogleOAuthProvider clientId="868613675678-4d11tmtnr8d32sr4ude0cdtud8rdntma.apps.googleusercontent.com">
                                                    <GoogleLogin
                                                        onSuccess={(credentialResponse) => {
                                                            axios
                                                                .post(api + `/login`, {
                                                                    type: 'google',
                                                                    name: jwtDecode(credentialResponse.credential).name,
                                                                    email: jwtDecode(credentialResponse.credential)
                                                                        .email,
                                                                    picture: jwtDecode(credentialResponse.credential)
                                                                        .picture,
                                                                    createdAt: new Date().toISOString(),
                                                                })
                                                                .then((res) => {
                                                                    dispatch(setUser(res.data));
                                                                    navigate('/');
                                                                })
                                                                .catch((err) => {
                                                                    alert(err.response.data);
                                                                });
                                                        }}
                                                        onError={() => {
                                                            alert('Login Failed');
                                                        }}
                                                        type="icon"
                                                    />
                                                </GoogleOAuthProvider>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="login__form-login register">
                                        <div className="login__title">
                                            <h2>Đăng ký</h2>
                                        </div>
                                        <div className="login__form-input">
                                            <input type="text" id="name-register" placeholder="Name" />
                                        </div>
                                        <div className="login__form-input">
                                            <input
                                                type="email"
                                                id="email-register"
                                                placeholder="Email"
                                                required="required"
                                            />
                                        </div>
                                        <div className="login__form-input">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password-register"
                                                placeholder="Mật khẩu"
                                                required="required"
                                            />
                                            {showPassword ? (
                                                <div
                                                    onClick={() => {
                                                        setShowPassword(false);
                                                    }}
                                                >
                                                    <SVGEyeOpen width={20} classs="eye" />
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        setShowPassword(true);
                                                    }}
                                                >
                                                    <SVGEyeClose width={20} classs="eye" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="login__form-input">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password-confirm"
                                                placeholder="Nhập lại mật khẩu"
                                            />
                                        </div>
                                        <div
                                            className="login__form-input"
                                            onClick={() => {
                                                const name = document.getElementById('name-register').value;
                                                const email = document.getElementById('email-register').value;
                                                const password = document.getElementById('password-register').value;
                                                const passwordConfirm =
                                                    document.getElementById('password-confirm').value;

                                                if (password !== passwordConfirm) {
                                                    alert('Mật khẩu không khớp');
                                                    return;
                                                }

                                                if (!regexEmail.test(email)) {
                                                    alert('Email không hợp lệ');
                                                    return;
                                                }
                                                axios
                                                    .post(api + `/register`, {
                                                        name,
                                                        email,
                                                        password,
                                                        passwordConfirm,
                                                    })
                                                    .then((res) => {
                                                        dispatch(setUser(res.data));

                                                        navigate('/');
                                                    })
                                                    .catch((err) => {
                                                        alert(err.response.data);
                                                    });
                                            }}
                                        >
                                            <ButTon text="Đăng ký" />
                                        </div>
                                    </div>
                                </div>
                                <div className="login__form-input">
                                    <p>
                                        {toggle ? (
                                            <>
                                                Bạn đã có tài khoản?{' '}
                                                <span
                                                    onClick={() => {
                                                        dispatch(setToggle(!toggle));
                                                    }}
                                                    className="login__form-input--link"
                                                >
                                                    Đăng nhập
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                Bạn chưa có tài khoản?{' '}
                                                <span
                                                    onClick={() => {
                                                        dispatch(setToggle(!toggle));
                                                    }}
                                                    className="login__form-input--link"
                                                >
                                                    Đăng ký
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Login;
