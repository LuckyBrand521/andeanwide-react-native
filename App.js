import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import { LogBox } from 'react-native';
import store from './store.js';


export default function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    )
}