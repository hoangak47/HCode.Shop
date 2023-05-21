import './index.scss';

function Footer() {
    return (
        <footer>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-6 m-12">
                        <p>© 2023 HCode. Tất cả các quyền được bảo lưu</p>
                    </div>
                    <div className="col l-6 m-12">
                        <p>Ngôn ngữ: Tiếng Việt</p>
                    </div>
                </div>

                <p className="footer__address">
                    Địa chỉ: 965/28 Quang Trung, Phường 14, Gò Vấp, Thành Phố Hồ Chí Minh. Tổng đài hỗ trợ: 0962753060 -
                    Email: nguyenhoang41911@gmail.com
                </p>

                <p className="footer__copyright">© 2023 - Bản quyền thuộc về HCode.dev</p>
            </div>
        </footer>
    );
}

export default Footer;
