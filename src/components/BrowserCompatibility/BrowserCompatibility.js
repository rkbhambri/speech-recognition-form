import React from 'react';

const BrowserCompatibility = (props) => {
    return (
        <div className="alert alert-danger text-center col-md-6 offset-3 mt-5">
            <h3 className>It looks like your browser doesn't support speech recognition.</h3>
        </div>
    );
};

export default BrowserCompatibility;
