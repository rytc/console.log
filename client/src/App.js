import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import UserAPI from './utils/UserAPI'
import { default as useAuth, AuthProvider } from './utils/AuthContext/AuthContext'
import { UserDataProvider } from './utils/UserContext/UserContext'
import useUserData from './utils/UserContext'

// Components
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

// Pages
import Landing from './pages/Landing'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Admin from './pages/Admin'
import Logout from './pages/Logout'
import { useContext, useEffect, useState } from 'react'
import Aboutus from './pages/Aboutus'
import Topic from './pages/Topic'

const RedirectIfLoggedin = ({children}) => {
        const auth = useAuth();
        if(auth.auth) {
            return <Navigate to="/feed" replace />
        } else {
            return <>{children}</>
        }
    }

function App() {
    const userData = useUserData();
    const auth = useAuth();

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };


    useEffect(() => {
        if(auth) {
            userData.getUserData();
        }
    }, [])

    

    const RootRoute = () => {
        return (
            <RedirectIfLoggedin>
                <Landing />
            </RedirectIfLoggedin>
        )
    }

    const LoginRoute = () => {
        if (auth) {
            return <Navigate to="/feed" replace />
        } else {
            return <Login />
        }
    }

    const RegisterRoute = () => {
        if (auth) {
            return <Navigate to="/feed" replace />
        } else {
            return <Register />
        }
    }


    return (
        <AuthProvider>
            <UserDataProvider>
                <Router>
                    <Routes>
                        <Route exact path='/login' element={<LoginRoute />} />
                        <Route exact path='/register' element={<RegisterRoute />} />
                        <Route exact path="/logout" element={<Logout />} />
                        <Route exact path='/' element={<RootRoute />} />
                        <Route exact path="/feed" element={<Home />} />
                        <Route exact path='/post/:id' element={<Post />} />
                        <Route exact path='/profile/:username' element={<Profile />} />
                        <Route exact path='/topic/:topic' element={<Topic />} />
                    </Routes>
                </Router>
            </UserDataProvider>
        </AuthProvider>
    )
}

export default App
