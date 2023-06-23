import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';

const Login = ({ setLoginUser }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        })
    }

    const signup = () => {

        navigate('/register');

    }

    const login = (event) => {
        event.preventDefault();
        // navigate('/admin')
        axios.post("http://localhost:8000/Login", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                localStorage.setItem('currentUser', JSON.stringify(res.data))
                localStorage.setItem('token', JSON.stringify(res.data.token))
                if(res.data.token){

                    if(res.data.user.role=== 'Admin'){
                        navigate('/admin')
                    }
                    else{
                        navigate("/user")
                    }
                }
                else{
                    alert("authentication failed")
                }
                // navigate('/admin')
                // if (res.data.user.role === 'Admin') {
                //     //localStorage.setItem('currentUser', JSON.stringify(res.data))
                //     navigate('/admin')

                // }
                // else {
                //     //localStorage.setItem('currentUser', JSON.stringify(res.data))
                //     navigate("/user")
                // }
            }
        )
    }

    // useEffect(() => {

    //     let userExist = localStorage.getItem('currentUser');
    //     if (userExist) {
    //         navigate("/LoginSuccess")

    //     }
    // }, [])
    return (


        <>

            <div className="container login-section">
                <div className="app-wrapper">
                    <div>
                        <h2 className="title">
                            Login To Your Account
                        </h2>
                    </div>
                    <form  >
                        <div className="email">
                            <label >Email</label>

                            <input type="email"
                                className="input"
                                id="sign-in-email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Your email" />
                        </div>

                        <div className="password">
                            <label >Password</label>

                            <input type="password"
                                className="input"
                                id="sign-in-password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Your password" />

                        </div>
                        <button type="btn" className="submit" onClick={login}>
                            Login
                        </button>

                        <p>New User,Create a Account</p>
                        <button type="btn" className="submit" onClick={signup} >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login