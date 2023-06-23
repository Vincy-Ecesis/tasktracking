
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './ManageUsers';
import Register from '../AddUser/AddUser'
import './adminhome.css';
import Navbar from '../Navbar/Navbar';
import Report from '../Report/Report';
import ManageTasks from './ManageTasks';
import ManageProjects from './ManageProjects.js';
import Dashboard from './dashboard';
import authHOC from '../config/authHOC';
// import { MDBContainer } from "mdb-react-ui-kit";

const AdminHome = () => {

    const [gggh,fdgf]=useState();
    const logout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = "/";
    }

    return (
        <>
            <Navbar />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className="main-project d-flex">
                    <Col sm={2} className="tab-components">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link className='manage-link' eventKey="first">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Manage Users</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Manage Projects</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Manage Tasks</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Reports</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sixth">Logout</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className='table-content'>
                            <Tab.Pane className='Project-list' eventKey="first">

                                {/* <p className='admin-name-text'>Admin</p> */}
                                <Dashboard />

                            </Tab.Pane>
                            <Tab.Pane eventKey="second">

                                <Admin />

                            </Tab.Pane>
                            <Tab.Pane eventKey="third">

                                <ManageProjects />

                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">

                                <ManageTasks />

                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">

                                <Report />

                            </Tab.Pane>
                            <Tab.Pane eventKey="sixth">
                                <p className='log-out-text'>Click Here To Logout</p>
                                <div className='log-out'>
                                    <Button onClick={() => { logout() }}>Logout</Button>
                                </div>

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </div>
            </Tab.Container>

        </>
    )
}

export default authHOC(AdminHome)