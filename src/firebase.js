import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { API_URL } from './constants';

const firebaseConfig = {
	apiKey: 'AIzaSyDcVXI8-HslMhw9V066AWcm2DFojg6A168',
	authDomain: 'todoproject-22791.firebaseapp.com',
	projectId: 'todoproject-22791',
	storageBucket: 'todoproject-22791.firebasestorage.app',
	messagingSenderId: '728056651928',
	appId: '1:728056651928:web:2135d65b3c7554335830ed',
	measurementId: 'G-N8M4RG8QS4',
	databaseURL: API_URL,
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
