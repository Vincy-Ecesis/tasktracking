

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './navbar.css'

const Navbarheader = () => {


    const logout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = "/";
    }

    return (
        <>

            <Navbar className='navbar-section' variant="dark">
               
                    <Navbar.Brand href="#home">Daily Task Management</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Nav.Link href="/">Home</Nav.Link> */}
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    <div className='logout-nav' onClick={() => { logout() }}>Logout</div>
               
            </Navbar>

        </>
    )
}

export default Navbarheader