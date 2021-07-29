import 'react-native-gesture-handler';
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { LogBox } from 'react-native';


export default function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    return <Navigation / >
}