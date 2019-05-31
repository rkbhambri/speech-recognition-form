import React, { useState, useEffect } from 'react';
import VoiceIcon from './VoiceIcon/VoiceIcon';
import Form from './Form/Form';
import { isNameValid, isEmailValid } from '../../Helpers/Body';

const Controls = (props) => {
    const browserSpecificRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    const voices = speechSynthesis.getVoices();
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
            message.voice = voices[54];
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

    const setCommonState = (question) => {
        message.text = question;
        setQuestion(question);
        setMessage(message);
        setFlag(true);
    };

    const fallbackResponse = (question) => {
        message.text = question;
        message.volume = 1;
        message.voice = voices[54];
        speechSynthesis.speak(message);
        startVoiceRecognition();
    }

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
            let transcript = event.results[i][0].transcript.trim();
            speechText = speechText ? speechText.concat(transcript) : transcript;
            setSpeechText(speechText);

            // Check if user said 'stop'/'pause' then stop recording voice
            if (transcript === 'pause' || transcript === 'stop') {
                recognition.stop();
                setFlag(false);
                disableStart && setDisableStart(false);
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
            // Check if user speaks firstname then set firstname
            else if (message.text.includes('firstname')) {
                if (isNameValid(transcript)) {
                    setFirstName(transcript);
                    setCommonState('whats your lastname');
                } else {
                    fallbackResponse('Please enter valid firstname');
                }
            }
            // Check if user speaks lastname then set lastname
            else if (message.text.includes('lastname')) {
                if (isNameValid(transcript)) {
                    setLastName(transcript);
                    setCommonState('whats your email');
                } else {
                    fallbackResponse('Please enter valid lastname');
                }
            }
            // Check if user speaks email then set email
            else if (message.text.includes('email')) {
                transcript = transcript.replace(/ +/g, "").toLowerCase();
                if (isEmailValid(transcript)) {
                    setEmail(transcript);
                    setCommonState('whats your contact');
                } else {
                    fallbackResponse('Please enter valid email');
                }
            }
            // Check if user say 'contact' then set contact number
            else if (message.text.includes('contact')) {
                if (!isNaN(Number(transcript.replace(/ +/g, "")))) {
                    setContact(Number(transcript.replace(/ +/g, "")));
                    setCommonState('Do you want to submit or reset');
                } else {
                    fallbackResponse('Please enter valid contact');
                }
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
