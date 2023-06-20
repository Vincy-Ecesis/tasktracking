import React, { useState } from 'react'
import useForm from "./SubmitAddForm";
import './addprojectform.css';
import { MultiSelect } from "react-multi-select-component";

const AddProjectForm = ({ submitForm }) => {

    const { handleChange, handleImage, handleFormSubmit, values, errors } = useForm(submitForm);

    

    return (
        <>
            <div className="add-project">
                <div className="app-wrapper">
                    <div>
                        <h2 className="title" style={{ marginTop: '10px' }}>
                            Create Project
                        </h2>
                    </div>
                    <div>
                        
                    </div>

                    <form   method="post" enctype="multipart/form-data" >
                        <div className="projectname">
                            <label >Project Name</label>
                            <input type="text"
                                id="create-account-firstname"
                                className="input"
                                name="projectname"
                                value={values.projectname}
                                onChange={handleChange}
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
                                onChange={handleChange}
                                placeholder="Desription" />
                        </div>
                        {errors.description && <p className="error">{errors.description}</p>}
                       
                       
                        {/* image upload */}

                        <div>
                        <label >Project Image</label>
                            <input  type="file" name="projectImage" 
                                onChange={handleImage} />
                            {/* {values &&
                                <div>
                                    <span>{values.projectImage}</span>
                                    <img src={URL.createObjectURL(file)} />
                                </div>
                            } */}
                        </div>

                        <button type="submit" className="submit" onClick={handleFormSubmit} >
                           Add Project
                        </button>
                        <br />

                    </form>
                </div>
            </div>
        </>
    )
}


export default AddProjectForm