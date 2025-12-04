import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/common/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ ...props }) {
    const { data, login, logout, state } = props;
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <div>
            {logout || login ? (
                login ? (
                    <Button className={classes} leftIcon={data.icon} to={data.to} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                ) : (
                    <Button className={classes} leftIcon={data.icon} to={data.to} onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                )
            ) : (
                <Button className={classes} leftIcon={data.icon} to={data.to} state={state}>
                    {data.title}
                </Button>
            )}
        </div>
    );
}
MenuItem.propTypes = {
    data: PropTypes.object,
};

export default MenuItem;
