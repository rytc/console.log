import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import UserAPI from './utils/UserAPI'

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
import UserContext from './utils/UserContext'
import Aboutus from './pages/Aboutus'
import Topic from './pages/Topic'

function App() {

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const [userState, setUserState] = useState({
        loggedIn: localStorage.getItem('jwt') ? true : false,
        userData: null,
        loading: true
    })

    const setLoggedIn = (loggedIn) => {
        setUserState({ ...userState, loggedIn: loggedIn })
    }

    useEffect(() => {
        if(userState.userData == null) {
            UserAPI.getUser().then(user => {
                setUserState({ loggedIn: true, userData: user, loading: false })
            }).catch(err => {
                setUserState({ ...userState, loading: false })
            })
        } else {
            setUserState({...userState, loading: false});
        }
        
    }, [])

    const RootRoute = () => {
        if (userState.loggedIn) {
            if (userState.loading) {
                return <h1>Loading</h1>
            } else {
                return <Home />
            }
        } else {
            return <Landing />
        }
    }

    const LoginRoute = () => {
        if (userState.loggedIn) {
            return <Navigate to="/" />
        } else {
            return <Login />
        }
    }

    const RegisterRoute = () => {
        if (userState.loggedIn) {
            return <Navigate to="/" />
        } else {
            return <Register />
        }
    }

    return (
        <>
        <UserContext.Provider value={{ ...userState, setLoggedIn: setLoggedIn }}>
            <Router>
                <Routes>
                    <Route exact path='/' element={<RootRoute />} />
                    <Route exact path='/login' element={<LoginRoute />} />
                    <Route exact path='/register' element={<RegisterRoute />} />
                    <Route exact path='/post/:id' element={<Post />} />
                    <Route exact path='/profile/:username' element={<Profile />} />
                    <Route exact path='/topic/:topic' element={<Topic />} />
                </Routes>
            </Router>
        </UserContext.Provider>
        </>
    )
}

export default App
