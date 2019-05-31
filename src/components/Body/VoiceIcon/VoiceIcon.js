import React from 'react';
import GoogleVoiceIcon from '../../../images/voice.svg';
import Loader from '../../Loader/Loader';

const VoiceIcon = (props) => {
    return (
        <div className="note w-100">
            <h5>
                Start recording voice by clicking on
                <span className="pl-1">
                    <img
                        src={GoogleVoiceIcon}
                        alt="Not available"
                        style={{ width: '30px', height: '20px' }}
                        onClick={(event) => props.startVoiceRecognition(event)} />
                    {/* Enable loader when recognition starts */}
                    {
                        props.disableStart &&
                        <React.Fragment>
                            <Loader />
                            <span
                                className="close-icon ml-2"
                                style={{ fontSize: '22px', cursor: 'pointer' }}
                                onClick={(event) => props.pauseRecognition(event)}>&times;</span>
                        </React.Fragment>
                    }
                </span>
            </h5>
        </div>
    );
};

export default VoiceIcon;
