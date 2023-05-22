import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import ProfileAccount from './ProfileAccount';
import ChangePassword from './ChangePassword';
import PurchaseOrder from './PurchaseOrder';
import Img from '../../Component/Image';
import { setProfileLeftActive } from '../../features/loginSlice';

function Profile() {
    const user = useSelector((state) => state.loginSlice.user);
    const profileLeftActive = useSelector((state) => state.loginSlice.profileLeftActive);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        if (user && Object.keys(user).length === 0) {
            navigate('/login');
            return;
        }
    }, [user, navigate]);

    const profileLeft = [
        {
            icon: faUser,
            title: 'Thông tin cá nhân',
        },
        {
            icon: faKey,
            title: 'Đổi mật khẩu',
        },
        {
            icon: faTruckFast,
            title: 'Đơn hàng của tôi',
        },
    ];

    const profileRight = [ProfileAccount, ChangePassword, PurchaseOrder];

    return (
        <div className="profile">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-3">
                        <div className="profile__left">
                            <Img className="profile__left-avatar" src={user.picture} alt="" />
                            <span className="profile__left-avatar--name">{user.name}</span>
                            {user.type
                                ? profileLeft.map((item, index) => {
                                      return (
                                          index !== 1 && (
                                              <div
                                                  className={
                                                      profileLeftActive === index
                                                          ? 'profile__left item active'
                                                          : 'profile__left item'
                                                  }
                                                  onClick={() => dispatch(setProfileLeftActive(index))}
                                                  key={index}
                                              >
                                                  <FontAwesomeIcon className="icon" icon={item.icon} />
                                                  <span>{item.title}</span>
                                              </div>
                                          )
                                      );
                                  })
                                : profileLeft.map((item, index) => {
                                      return (
                                          <div
                                              className={
                                                  profileLeftActive === index
                                                      ? 'profile__left item active'
                                                      : 'profile__left item'
                                              }
                                              onClick={() => dispatch(setProfileLeftActive(index))}
                                              key={index}
                                          >
                                              <FontAwesomeIcon className="icon" icon={item.icon} />
                                              <span>{item.title}</span>
                                          </div>
                                      );
                                  })}
                        </div>
                    </div>
                    <div className="col l-9">
                        <div className="profile__right">
                            {profileRight.map((Item, index) => {
                                return profileLeftActive === index && <Item key={index} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
