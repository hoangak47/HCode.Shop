import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Button from '../../../Component/Button';

function PurchaseInfo({ handleSubmit, receiver, infoEmty }) {
    return (
        <div className="purchase__info backgroud-white">
            <div className="purchase__info--title">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Thông tin giao hàng</span>
            </div>
            <div className="purchase__info--content">
                <Form initialValues={{ remember: true }} onFinish={handleSubmit} autoComplete="off">
                    <Form.Item label="Tên người nhận" className="item" name="name" initialValue={receiver.name}>
                        {infoEmty === true ? (
                            <Input placeholder="Nhập tên người nhận" required />
                        ) : (
                            <b>{receiver.name} </b>
                        )}
                    </Form.Item>

                    <Form.Item label="Số điện thoại" className="item" name="phone" initialValue={receiver.phone}>
                        {infoEmty === true ? (
                            <Input
                                placeholder="Nhập số điện thoại"
                                onChange={(e) => {
                                    if (e.target.value.length > 10) {
                                        e.target.value = e.target.value.slice(0, 10);
                                    }
                                }}
                                required
                            />
                        ) : (
                            <b>{receiver.phone} </b>
                        )}
                    </Form.Item>

                    <Form.Item label="Địa chỉ" className="item" name="address" initialValue={receiver.address}>
                        {infoEmty === true ? (
                            <TextArea placeholder="Nhập địa chỉ" rows={6} required />
                        ) : (
                            <b>{receiver.address} </b>
                        )}
                    </Form.Item>

                    <Form.Item label="Email" className="item" name="email" initialValue={receiver.email}>
                        {infoEmty === true ? <Input placeholder="Nhập email" required /> : <b>{receiver.email} </b>}
                    </Form.Item>

                    <Form.Item>
                        {infoEmty === true ? (
                            <Button text="Lưu thông tin" type="submit" />
                        ) : (
                            <Button text="Sửa thông tin" type="submit" />
                        )}
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default PurchaseInfo;
