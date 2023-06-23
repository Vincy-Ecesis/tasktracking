import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import valid from '../../valid';
import { AiOutlineClose } from 'react-icons/ai'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

export default function EditUser() {
    let { id } = useParams();

    const navigate = useNavigate()
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
    })

    const [close, setClose] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:8000/users/${id}`).then(res => {

            if (res.data.success) {

                setValues(res.data.users)

            }
        });


    }, [id])
    const emailValid = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const nameValid = /^[A-z][A-z]{3,23}$/;
    const [errors, setErrors] = useState({});


    const handleInputChange = (event) => {


        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {

        event.preventDefault();
        setErrors(valid(values));
        const { firstname, lastname, email, role } = values;
        if (nameValid.test(firstname)
            && nameValid.test(lastname)
            && emailValid.test(email) && role) {
            const data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                role: role,

            };
            console.log(data)
            axios.put(`http://localhost:8000/users/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    console.log("Updated Successfully")
                    alert(res.data.message)
                    navigate('/admin')
                }
            });
        }
    };
    return (
        <div>
            <>
                <div className="add-project">
                    <div className="app-wrapper">
                    <div className='close-icon' onClick={() => setClose(!close)}>
                <AiOutlineClose />
              </div>
                        <div>
                            <h2 className="title" style={{ marginTop: '10px' }}>
                                Edit User Details
                            </h2>
                        </div>
                        <form >
                            <div className="firstname">
                                <label >Name</label>
                                <input type="text"
                                    id="create-account-firstname"
                                    className="input"
                                    name="firstname"
                                    value={values.firstname}
                                    onChange={handleInputChange}
                                    placeholder="First Name" />
                            </div>
                            {errors.firstname && <p className="error">{errors.firstname}</p>}
                            <div className="lastname">
                                <label >Last Name</label>
                                <input type="text"
                                    id="create-account-lastname"
                                    className="input"
                                    name="lastname"
                                    value={values.lastname}
                                    onChange={handleInputChange}
                                    placeholder="Last Name" />
                            </div>
                            {errors.lastname && <p className="error">{errors.lastname}</p>}
                            <div className="email">
                                <label >Email</label>
                                <input type="email"
                                    id="create-account-email"
                                    className="input"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    placeholder="Email" />
                            </div>
                            {errors.email && <p className="error">{errors.email}</p>}
                            <div className="role">
                                <label >Role</label>
                                <br />
                                <div >
                                    <select type="text"
                                        name="role"
                                        className='input'
                                        value={values.role}
                                        onChange={handleInputChange}
                                        placeholder="Role"
                                        style={{ width: '400px', height: '40px' }} >
                                        <option value="0" style={{ color: 'black' }} className='input'>Choose Your Role</option>
                                        <option style={{ color: "black" }} value="Admin" className='input'>Admin</option>
                                        <option style={{ color: "black" }} value="User" className='input'>User</option>
                                    </select></div>
                            </div>
                            {errors.role && <p className="error">{errors.role}</p>}

                            <button type="submit" className="submit" onClick={onSubmit} >
                               Save
                            </button>
                            <br />

                        </form>
                    </div>
                </div>
            </>
        </div>
    )
}
