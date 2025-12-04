import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.module.scss';

function ServiceCard({ service }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/service/${service.serCateID}`);
    };

    return (
        <div className="service-card" onClick={handleClick}>
            <div className="service-image">
                <img
                    src={service.imageUrl || 'https://via.placeholder.com/150'}
                    alt={service.serCateName}
                />
            </div>
            <h5 className="service-name">{service.serCateName}</h5>
            <p className="service-desc">{service.description}</p>
        </div>
    );
}

export default ServiceCard;
