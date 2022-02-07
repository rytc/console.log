import './App.css'
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import UserAPI from './utils/UserAPI'
import { default as useAuth, AuthProvider } from './utils/AuthContext/AuthContext'
import { UserDataProvider } from './utils/UserContext/UserContext'

// Components
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

// Pages
import AppRouter from './AppRouter'


function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <AuthProvider>
            <UserDataProvider>
                <AppRouter />
            </UserDataProvider>
        </AuthProvider>
    )
}

export default App
