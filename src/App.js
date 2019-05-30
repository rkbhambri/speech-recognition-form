import React from 'react';
import BrowserCompatibility from './components/BrowserCompatibility/BrowserCompatibility';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {
	let isBrowserNotCompatible = false;

	if (!window.hasOwnProperty('webkitSpeechRecognition')) {
		isBrowserNotCompatible = true;
	}

	return (
		<div className="app">
			{isBrowserNotCompatible ? <BrowserCompatibility /> : <Layout />}
		</div>
	);
}

export default App;
