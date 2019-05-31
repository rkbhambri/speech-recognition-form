import React, { useState, useEffect } from 'react';
import VoiceIcon from './VoiceIcon/VoiceIcon';
import Form from './Form/Form';

const Controls = (props) => {
    const browserSpecificRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    let [message, setMessage] = useState(new SpeechSynthesisUtterance());
    const [recognition] = useState(browserSpecificRecognition);
    const [question, setQuestion] = useState('whats your firstname');
    const [disableStart, setDisableStart] = useState(false);
    const [disablePause, setDisablePause] = useState(false);
    // const [error, setError] = useState(null);
    let [speechText, setSpeechText] = useState();
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [contact, setContact] = useState('');
    let [isSubmit, setSubmitFlag] = useState(false);
    let [flag, setFlag] = useState(false);

    useEffect(() => {
        if (flag) {
            message.text = question;
            message.volume = 1;
            startRecognition();
            speechSynthesis.speak(message);
        }
    }, [flag, message, question]);

    const startVoiceRecognition = () => {
        if (!disableStart && !isSubmit) {
            setFlag(true);
        }
    };

    const startRecognition = (event) => {
        event && event.preventDefault();
        if (!disableStart && !isSubmit) {
            recognition.lang = 'en-IN';
            recognition.continuous = true;
            setDisableStart(true);
            disablePause && setDisablePause(false)
            recognition.start();
        }
    };

    const resetFormFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setContact('');
        disableStart && setDisableStart(false);
        recognition.stop();
    };

    recognition.onresult = (event) => {
        const resultsLength = event.results.length;
        for (let i = event.resultIndex; i < resultsLength; i++) {
            const transcript = event.results[i][0].transcript.trim();
            speechText = speechText ? speechText.concat(transcript) : transcript;
            setSpeechText(speechText);

            // Check if user said 'stop'/'pause' then stop recording voice
            if (transcript === 'pause' || transcript === 'stop') {
                resetFormFields();
                recognition.stop();
                setFlag(false);
                disableStart && setDisableStart(false);
            }
            // Check if user speaks firstname then set firstname
            else if (message.text.includes('firstname')) {
                setFirstName(transcript);
                message.text = 'whats your lastname';
                setQuestion('whats your lastname');
                setMessage(message);
                setFlag(true);
                // speechSynthesis.pause();
            }
            // Check if user speaks lastname then set lastname
            else if (message.text.includes('lastname')) {
                setLastName(transcript);
                message.text = 'whats your email';
                setQuestion('whats your email');
                setMessage(message);
                setFlag(true);
                // speechSynthesis.pause();
            }
            // Check if user speaks email then set email
            else if (message.text.includes('email')) {
                setEmail(transcript.replace(/ +/g, "").toLowerCase());
                message.text = 'whats your contact';
                setQuestion('whats your contact');
                setMessage(message);
                setFlag(true);
                // speechSynthesis.pause();
            }
            // Check if user say 'contact' then set contact number
            else if (message.text.includes('contact')) {
                isNaN(Number(transcript.replace(/ +/g, ""))) ? alert('Please enter valid number') : setContact(Number(transcript.replace(/ +/g, "")));
                message.text = 'Do you want to submit or reset';
                setQuestion('Do you want to submit or reset');
                setMessage(message);
                setFlag(true);
            }
            // Check if user say 'Reset' then reset input details
            else if (event.results[i - 1] !== undefined && transcript.includes('reset')) {
                resetFormFields();
                setFlag(false);
                setQuestion('whats your firstname');
            }
            // Check if user say 'Submit Form' then submit response and show thanks message
            else if (event.results[i - 1] !== undefined && transcript.includes('submit')) {
                resetFormFields();
                setSubmitFlag(true);
                setFlag(false);
                setQuestion('whats your firstname');
                setTimeout(() => {
                    setSubmitFlag(false);
                }, 8000);
            }

        }
    };

    // recognition.onerror = (event) => {
    //     setError(event.error);
    // };

    const pauseRecognition = (event) => {
        event.preventDefault();
        setDisablePause(true);
        setFlag(false);
        disableStart && setDisableStart(false);
        recognition.stop();
    };

    return (
        <div className="controls w-100 mt-4">
            <VoiceIcon
                startVoiceRecognition={(event) => startVoiceRecognition(event)}
                pauseRecognition={(event) => pauseRecognition(event)}
                disableStart={disableStart}
                speechText={speechText} />
            <Form
                firstName={firstName}
                lastName={lastName}
                email={email}
                contact={contact}
                isSubmit={isSubmit}
            />
        </div>
    );
};

export default Controls;
