import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Menu({ label, children }) {
    return (
        <nav className={cx('wrapper')}>
            <h3>{label}</h3>
            {children}
        </nav>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
