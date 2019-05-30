
import React from 'react';
import Heading from '../Heading/Heading';
import Body from '../Body/Body';

const Layout = (props) => {
    return (
        <div className="layout col-md-10 offset-1 pt-5 text-center">
            <div className="message-controls col-md-6 offset-3">
                <Heading heading="Fill your form with speech recognition" />
                <Body />
            </div>
        </div>
    );
};

export default Layout;
