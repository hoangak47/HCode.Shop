import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { Form, Input, Select } from 'antd';
import Button from '../../../Component/Button';
import { notification } from 'antd';
import updateUser from '../../../Component/UpdateUser';
import LoadingSpiner from '../../../Component/LoadingSpiner';

function ProfileAccount() {
    const user = useSelector((state) => state.loginSlice.user);
    const loadingSpinner = useSelector((state) => state.apiProduct.loadingSpinner);

    const dispatch = useDispatch();

    const optionGender = [
        {
            value: 'male',
            label: 'Nam',
        },
        {
            value: 'female',
            label: 'Nữ',
        },
        {
            value: 'other',
            label: 'Khác',
        },
    ];

    const onFinish = async (values) => {
        await updateUser(values, user, dispatch);

        setTimeout(() => {
            notification.success({
                message: 'Cập nhật thành công',
                description: 'Thông tin của bạn đã được cập nhật',
                duration: 2,
            });
        }, 1000);
    };
    return (
        <div className="grid ">
            {loadingSpinner && <LoadingSpiner />}
            <div className="row">
                <div className="col l-12">
                    <div className="profile__account">
                        <div className="title--profile">
                            <h3>Hồ Sơ Của Tôi</h3>
                            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row profile__account--content">
                <div className="col l-12 s-12">
                    <div className="profile__account">
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            layout="horizontal"
                            initialValues={{ size: 'default' }}
                            size={'default'}
                            onFinish={onFinish}
                            fields={[
                                {
                                    name: ['name'],
                                    value: user.name,
                                },
                                {
                                    name: ['phone'],
                                    value: user.phone,
                                },
                                {
                                    name: ['gender'],
                                    value: user.gender,
                                },
                                {
                                    name: ['address'],
                                    value: user.address,
                                },
                            ]}
                        >
                            <Form.Item
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                                name="name"
                            >
                                <Input itialvalue={user.name} />
                            </Form.Item>
                            <Form.Item label="Email" disabled>
                                <Input value={user.email} />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ max: 10, message: 'Please input your phone!' }]}
                            >
                                <Input itialvalue={user.phone} />
                            </Form.Item>
                            <Form.Item name="gender" label="Giới tính">
                                <Select placeholder="select your gender">
                                    {optionGender.map((item, index) => (
                                        <Select.Option key={index} value={item.value}>
                                            {item.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Địa Chỉ" name="address">
                                <Input.TextArea itialvalue={user.address} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <>
                                    <Button htmlType="submit" text="Lưu Thay Đổi"></Button>
                                </>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileAccount;
