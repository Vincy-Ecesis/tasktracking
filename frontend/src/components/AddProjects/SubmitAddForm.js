import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

// import "../App.js";
import valid from "./valid";
const useForm = (submitForm) => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        projectname: "",
        description: "",
       assignto:"",
        projectImage:"",
       

    })

 
    const nameValid = /^[A-z][A-z]{3,23}$/;
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value, })
    }

    const handleImage=(event)=>{

        console.log("jhjhasdasj",event.target)
        
        setValues({ ...values,projectImage:event.target.files[0] })
        console.log("jhjhj",event.target.files[0])
        
    }
    // useEffect(() => {

    //     let userExist = localStorage.getItem('currentUser');
    //     if (userExist) {
    //         navigate("/RegisterSuccess")

    //     }
    // }, [])
    // const handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(valid(values))
    //     console.log("event",event)
    //     console.log("jhjhj",values)
    //     const { projectname, description, email} = values;
    //     // console.log("projectImage",projectImage)
    //     if (nameValid.test(projectname)
    //         && nameValid.test(description)
    //         && emailValid.test(email)
           
    //         ) {
    //             let data = values;
    //             data.append('projectname',projectname)
    //             data.append('description',description)
    //             // data.append('projectImage',projectImage)
    //             data.append('email',email)
           
            
    //         axios.post("http://localhost:8000/addproject", data)
    //             .then(res => {
    //                 if (res.data.isRegistered) {

    //                     alert(res.data.message)
    //                     console.log(res.data)
    //                     //localStorage.setItem('currentUser', JSON.stringify(res.data))
    //                     navigate('/ViewProject')

    //                 } else {

    //                     alert(res.data.message)

    //                 }
    //             })
    //     }
    //     else {
    //         alert("invalid input")
    //     };
    // };


    const handleFormSubmit = (event) => {
        event.preventDefault();
       
      //   alert(inputs);
        console.log("hhh",values)
        axios.post("http://localhost:8000/addproject", values)
        .then(res => {
           
                alert(res.data.message)
                console.log("ImGE",res.data)
                //localStorage.setItem('currentUser', JSON.stringify(res.data))
                navigate('/admin')
                // alert(res.data.message)
        })
      }

      





    return { handleChange,handleImage, handleFormSubmit, errors, values };
};
export default useForm;
