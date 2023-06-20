import './App.css';
import React from "react";
import Homepage from "./components/homepage/Homepage"
import Login from "./components/login/Login"
import AddUser from "./components/AddUser/AddUser"
import RegisterSuccess from "./components/Success/RegisterSuccess"
import LoginSuccess from "./components/Success/LoginSuccess"
import Admin from './components/admin/ManageUsers';
import EditUser from './components/AddUser/edit/EditUser';
import {
  Routes,
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { useState, useEffect, Fragment } from 'react';
import AdminHome from './components/admin/AdminHome';
import AddTask from './components/AddTask/AddTask';
import ViewTasks from './components/admin/ManageTasks';
import AddProjectForm from './components/AddProjects/AddProjects';
import EditProjects from './components/AddProjects/EditProjects';
import UserHome from './components/UserDashboard/UserHome';


function App() {
  const [user, setLoginUser] = useState("")


  useEffect(() => {
    // // check user here
    // localStorage.getItem



  }, [])
  return (
    <div className="App">

      <Router>
        <Routes>
          <Fragment>
            {/* <Route path="/" element={<Homepage  />} exact /> */}
            <Route path="/" element={<Login setLoginUser={setLoginUser} />} exact />
            <Route path="/adduser" element={<AddUser />} exact />
            <Route path="/register" element={<AddUser />} exact />
            <Route path="/LoginSuccess" element={<LoginSuccess />} exact />
            <Route path="/RegisterSuccess" element={<RegisterSuccess />} exact />
            <Route path="/admin" element={<AdminHome />} exact />
            <Route path="/logout" element={<logout />} exact />
            <Route path="/edituser/:id" element={<EditUser />} exact />
            <Route path="/tasks" element={<ViewTasks />} exact />
            <Route path="/addprojects" element={<AddProjectForm />} exact />
            <Route path="/editproject/:id" element={<EditProjects />} exact />
            <Route path="/user" element={<UserHome />} exact />
            <Route path="/addtask" element={<AddTask/>} exact />
          </Fragment>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
