


export const convertTextToSpeech = (event, message) => {
    event.preventDefault();
    speechSynthesis.speak(message);
};

export const pause = (event) => {
    event.preventDefault();
    speechSynthesis.pause();
};

export const resume = (event) => {
    event.preventDefault();
    speechSynthesis.resume();
};