import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "../../App.js";
import valid from "../valid";
const useForm = (submitForm) => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",

    })

    const emailValid = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const nameValid = /^[A-z][A-z]{3,23}$/;
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value, })

    }
    // useEffect(() => {

    //     let userExist = localStorage.getItem('currentUser');
    //     if (userExist) {
    //         navigate("/RegisterSuccess")

    //     }
    // }, [])
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(valid(values))
        const { firstname, lastname, role, email, password, } = values;
        if (nameValid.test(firstname)
            && nameValid.test(lastname)
            && emailValid.test(email)
            && role
            && passwordValid.test(password)
        ) {
            axios.post("http://localhost:8000/adduser", values)
                .then(res => {
                    if (res.data.isRegistered) {

                        alert(res.data.message)
                        console.log(res.data)
                        //localStorage.setItem('currentUser', JSON.stringify(res.data))
                        // getUsers();
                        if (res.data.user.role === 'Admin') {
                            //localStorage.setItem('currentUser', JSON.stringify(res.data))
                            navigate('/admin')
        
                        }
                        else {
                            //localStorage.setItem('currentUser', JSON.stringify(res.data))
                            navigate("/user")
        
                        }
                        // navigate('/admin')

                    } else {
                        
                        alert(res.data.message)

                    }
                })
        }
        else {
            alert("invalid input")
        };
    };

    return { handleChange, handleFormSubmit, errors, values };
};
export default useForm;
