import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import {
    Container,
} from "@mui/material"
import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../utils/AuthContext"

const Logout = (props) => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    useEffect(() => {
        logout();
        navigate('/', {replace: true});
    })

    return (
        <>
            <AppHeader />
                <Container sx={{marginTop: "1em"}}>
                    <h1>Logging out...</h1>
                </Container>
            <AppFooter />
        </>
    );
}

export default Logout