import React from 'react';

function GoogleMap() {
    return (
        <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61344.135600479734!2d108.14952222167966!3d16.065050000000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421993448d03bf%3A0xba71443b2a1b7881!2zSGFpciBTYWxvbiBUcsOtIEhvw6BuZyBWxak!5e0!3m2!1svi!2s!4v1763905329414!5m2!1svi!2s"            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
        ></iframe>
    );
}

export default GoogleMap;
