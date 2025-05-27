import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import './assets/components_css/header.css'
import {useEffect, useState} from "react";

function Header() {

    const [flag, setFlag] = useState("Albion Small Scale Reporter");

    useEffect(() => {
        const checkScreenSize = () => {
            if(window.innerWidth < 768){
                setFlag("ASSR");
            }else{
                setFlag("Albion Small Scale Reporter");
            }
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="headbar">
                <Container>
                    <Navbar.Brand to="/" className="main_name">{flag}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className={"header_link"} as={Link} to="/">Daily battles</Nav.Link>
                        <Nav.Link className={"header_link"} as={Link} to="/week">Weekly report</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;