import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import './assets/components_css/header.css'

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="headbar">
                <Container>
                    <Navbar.Brand to="/" className="main_name">Albion Small Scale Reporter</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Daily battles</Nav.Link>
                        <Nav.Link as={Link} to="/week">Weekly report</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;