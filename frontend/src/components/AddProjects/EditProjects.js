import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import valid from './valid';
import {
    BrowserRouter as Router,
    useParams
} from "react-router-dom";

export default function EditProjects() {
    let { id } = useParams();

    const navigate = useNavigate()
    const [values, setValues] = useState({
        projectname: "",
        description: "",
       
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/projects/${id}`).then(res => {

            if (res.data.success) {

                setValues(res.data.projects)

            }
        });
    }, [id])

    const nameValid = /^[A-z][A-z]{3,23}$/;
    const [errors, setErrors] = useState({});
    const handleInputChange = (event) => {

        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {

        event.preventDefault();
        setErrors(valid(values));
        const { projectname, description } = values;
        if (nameValid.test(projectname)
           
           ) {
            const data = {
                projectname: projectname,
                description: description,
            };
            console.log(data)
            axios.put(`http://localhost:8000/projects/update/${id}`, data).then((res) => {
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
                <div className="container">
                    <div className="app-wrapper">
                        <div>
                            <h2 className="title" style={{ marginTop: '10px' }}>
                                Edit Project Details
                            </h2>
                        </div>
                        <form >
                            <div className="firstname">
                                <label >Project Name</label>
                                <input type="text"
                                    id="create-account-firstname"
                                    className="input"
                                    name="projectname"
                                    value={values.projectname}
                                    onChange={handleInputChange}
                                    placeholder="Project Name" />
                            </div>
                            {errors.projectname && <p className="error">{errors.projectname}</p>}
                            <div className="description">
                                <label >Description</label>
                                <input type="text"
                                    id="create-account-lastname"
                                    className="input"
                                    name="description"
                                    value={values.description}
                                    onChange={handleInputChange}
                                    placeholder="Description" />
                            </div>
                            {errors.description && <p className="error">{errors.description}</p>}
                            {/* <div className="email">
                                <label >Email</label>
                                <input type="email"
                                    id="create-account-email"
                                    className="input"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    placeholder="Email" />
                            </div>
                            {errors.email && <p className="error">{errors.email}</p>} */}
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
