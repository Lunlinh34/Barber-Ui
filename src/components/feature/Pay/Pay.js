// import classNames from 'classnames/bind';
// import styles from './Pay..module.scss';

// const cx = classNames.bind(styles);

// function Pay({ ...props }) {
//     const { pays, checked, setChecked } = props;

//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('heading-info')}>
//                 <h2>Thanh toán</h2>
//             </div>
//             <div className={cx('form-pay')}>
//                 {pays.map((pay) => (
//                     <div key={pay.payID} className={cx('pay-item')}>
//                         <input type="radio" checked={checked === pay.payID} onChange={() => setChecked(pay.payID)} />
//                         <p className={cx('pay-name')}>{pay.payMethod}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Pay;
// import classNames from 'classnames/bind';
// import styles from './Pay..module.scss';

// const cx = classNames.bind(styles);

// function Pay({ pays, checked, setChecked }) {
//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('heading-info')}>
//                 <h2>Phương thức thanh toán</h2>
//             </div>
//             <div className={cx('form-pay')}>
//                 {pays.map((pay) => (
//                     <label key={pay.payID} className={cx('pay-item')}>
//                         <input
//                             type="radio"
//                             name="payment"
//                             value={pay.payID}
//                             checked={checked === pay.payID}
//                             onChange={() => setChecked(pay.payID)}
//                         />
//                         <span className={cx('pay-name')}>{pay.payMethod}</span>
//                     </label>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Pay;
import classNames from "classnames/bind";
import styles from "./Pay..module.scss";
const cx = classNames.bind(styles);

function Pay({ pays, checked, setChecked, onSelectOnline }) {
    const handleChange = (id) => {
        setChecked(id);
        if (id === 2) {
            onSelectOnline();
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("heading-info")}>
                <h2>Phương thức thanh toán</h2>
            </div>

            <div className={cx("form-pay")}>
                {pays.map((pay) => (
                    <label key={pay.payID} className={cx("pay-item")}>
                        <input
                            type="radio"
                            name="payment"
                            value={pay.payID}
                            checked={checked === pay.payID}
                            onChange={() => handleChange(pay.payID)}
                        />
                        <span className={cx("pay-name")}>
                            {pay.payMethod}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Pay;
