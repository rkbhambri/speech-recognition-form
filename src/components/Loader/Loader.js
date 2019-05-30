import React from 'react';
import './Loader.css';

const Loader = (props) => {
    return (
        <span className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </span>
    );
};

export default Loader;
