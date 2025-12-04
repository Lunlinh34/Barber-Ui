import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

// Dữ liệu ảo
const infoLinks = [
  "Privacy Policy",
  "Refund Policy",
  "Shipping Policy",
  "Terms & Conditions"
];

const accountLinks = [
  "About Us",
  "Faq",
  "Contact"
];

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className="container">

                {/* Newsletter */}
                <div className="py-4">
                    <div className="container-xxl">
                        <div className="row align-items-center">
                            <div className="col-5">
                                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
                            </div>
                            <div className="col-7">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control py-1"
                                        placeholder="Your Email Address"
                                    />
                                    <span className="input-group-text p-2">
                                        Subscribe
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="py-4">
                    <div className="container-xxl">
                        <div className="row">

                            {/* Contact */}
                            <div className="col-4">
                                <h4 className="text-white mb-4">Contact Us</h4>

                                <p className="text-white mb-2">Trường Đại Học Kiến Trúc</p>
                                <p className="text-white mb-2">SĐT: 0917063167</p>
                                <p className="text-white mb-2">Email: luntong111022@gmail.com</p>
                                <p className="text-white">Facebook: tong.at.185827</p>
                            </div>

                            {/* Information (Fake Data) */}
                            <div className="col-3">
                                <h4 className="text-white mb-4">Information</h4>
                                <div className="footer-link d-flex flex-column">
                                    {infoLinks.map((item, index) => (
                                        <span key={index} className="text-white py-1">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Account (Fake Data) */}
                            <div className="col-3">
                                <h4 className="text-white mb-4">Account</h4>
                                <div className="footer-link d-flex flex-column">
                                    {accountLinks.map((item, index) => (
                                        <span key={index} className="text-white py-1">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="py-4">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-12">
                                <p className="text-center mb-0 text-white">
                                    &copy; {new Date().getFullYear()};
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;
