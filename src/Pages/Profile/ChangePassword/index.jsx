import { useSelector } from 'react-redux';
import Button from '../../../Component/Button';
import './index.scss';
import { Form, Input, notification } from 'antd';
import axios from 'axios';
import { api as api_ } from '../../../api';

function ChangePassword() {
    const user = useSelector((state) => state.loginSlice.user);
    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm();

    const success = () => {
        api.success({
            message: 'Cập nhật thành công',
            description: 'Thông tin của bạn đã được cập nhật',
        });
    };

    const error = () => {
        api.error({
            message: 'Cập nhật thất bại',
            description: 'Vui lòng kiểm tra lại mật khẩu cũ',
        });
    };

    const onFinish = (values) => {
        if (values.newPassword !== values.confirmNewPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        axios
            .post(api_ + `/user/change-password`, {
                id: user._id,
                password: values.oldPassword,
                newPassword: values.newPassword,
            })
            .then((res) => {
                success();
                setTimeout(() => {
                    form.resetFields();
                }, 500);
            })
            .catch((err) => {
                error();
            });
    };
    return (
        <div className="grid ">
            <div className="change-password">
                <div className="row">
                    <div className="col l-12">
                        <div className="title--profile">
                            <h3>Đổi Mật Khẩu</h3>
                            <p>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
                        </div>
                    </div>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ width: '100%', marginTop: '20px' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Old Password"
                            name="oldPassword"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {contextHolder}
                            <Button htmlType="submit" text="Lưu Thay Đổi"></Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
