
import React, { useState, filter, useEffect } from 'react'
import axios from 'axios';
import logout from '../logout';
import { Table, Button } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import { BsSearch } from 'react-icons/bs'
import { useNavigate ,useParams} from 'react-router-dom';
import AddUser from '../AddUser/AddUser';
import { AiOutlineClose } from 'react-icons/ai';
import EditUser from '../AddUser/edit/EditUser';
import valid from '../AddProjects/valid';
import { usePagination } from '@table-library/react-table-library/pagination';

const Admin = () => {

  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  // Render pagination controls

  const [users, setUsers] = useState();
  const [showadduser, setShowadduser] = useState();

  useEffect(() => {
    getUsers();
 
  }, [])


  //get All Users
  const getUsers = () => {
    axios.get('http://localhost:8000/users').then(res => {

      if (res.data.success) {
        // this.setState({
        //   users: res.data.users,

        // });
        setUsers(res.data.users)
        // console.log("lengthhh",res.data.users.length)
        // //this.state.users.sort();
      
        // const usersLength = res.data.users.length

        // console.log("users", usersLength)

      }
    });
  }


  // const pageNumbers = Math.ceil(users.length / itemsPerPage);
  // const renderPageNumbers = Array.from({ length: pageNumbers }, (_, index) => index + 1);

  //get user by id
  const getUserById = (users) => {
    setEditView(!editView);
    console.log("id in useEffect",users)
    
   
    axios.get(`http://localhost:8000/users/${users._id}`).then(res => {


        if (res.data.success) {

            setValues(res.data.users)

        }
      
    });
  
}

  //Delete User
  const del = (users) => {

    var option = window.confirm(`Are You sure Want to delete  ${users.firstname}`)
    if (option) {
      axios.delete(`http://localhost:8000/delete/${users._id}`).then(res => {

        alert("Deleted Successfully")
        getUsers();
        

      })
    }
  }

  //filter function for searching
  const filterContent = (users, searchTerm) => {
    console.log(users)
    const result = users.users.filter((user) => user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log(result)
    // this.setState({ users: result });
    setUsers(result);
  }

  //Search Function
  const handleTextSearch = (event) => {

    const searchTerm = event.currentTarget.value;
    axios.get('http://localhost:8000/users').then(res => {
      console.log(res.data)

      if (res.data.success) {
        filterContent(res.data, searchTerm)
      }
    })
  };

  const [inputs, setInputs] = useState({});
  const[editView,setEditView]=useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hhh", inputs)
    axios.post("http://localhost:8000/adduser", inputs)
      .then(res => {

        alert(res.data.message)
        console.log(res.data)
        //localStorage.setItem('currentUser', JSON.stringify(res.data))
        // navigate('/admin')
        setShowadduser(!showadduser);
        getUsers();

      })
  }
const [editid,setEditid]=useState();
  const viewEdit=(users)=>{
    setEditView(!editView);
   console.log("users id",users._id)
    // setEditid(editid);
    getUserById(users);
  }

  // let { id } = useParams();

  const navigate = useNavigate()
  const [values, setValues] = useState({
      firstname: "",
      lastname: "",
      email: "",
      role: "",
  })

  const [close, setClose] = useState(false);




  const emailValid = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const nameValid = /^[A-z][A-z]{3,23}$/;
  const [errors, setErrors] = useState({});



 // Change the current page
 const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};


  const handleInputChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    var option = window.confirm(`Are You sure Want to edit  ${users.firstname} records?`)

    if(option){
      setErrors(valid(values));
      setEditView(!editView)
      console.log("value",values);
      const { firstname, lastname, email, role } = values;
      // if (nameValid.test(firstname)
      //     && nameValid.test(lastname)
      //     && emailValid.test(email) && role) {
          const data = {
              firstname: firstname,
              lastname: lastname,
              email: email,
              role: role,
          };
          console.log("updated data",data)
          axios.put(`http://localhost:8000/users/update/${values._id}`, data).then((res) => {

          console.log("response",res)
          setEditView(!editView)
              if (res.data.success) {
                  console.log("Updated Successfully")
                  alert(res.data.message)
                  getUsers();
                  // navigate('/admin')
              }
          });
    }
    
      
      
  };

  return (

    <>
      {/* <h1 className="form-success mt-5">Welcome Admin ! </h1> */}
      {/* <div style={{ marginTop: '30px' }}>
          <a style={{ float: 'right' }} className='add-user-link' href="/adduser">Add Users</a>
        </div> */}


      {/* {!showadduser && ( */}
        <div className='"table table-striped"'>
          <div className='manage d-flex justify-content-center'>
            <div className='manage-heading' >Manage Users</div>
          </div>
          {/* <br />&nbsp; */}
          <div className='search-add'>
           
            <div>
              {/* <label>Search Here <BsSearch /></label>&nbsp; */}
              <input type="search"
                placeholder="search..."
                name='searchTerm'
                onChange={handleTextSearch} />
            </div>
            <div className='search-bar'>
              <a className='add-user-link' onClick={() => setShowadduser(!showadduser)} >Add User</a>
            </div>
          </div>

          <Table  striped bordered hover variant="dark">
            <thead>
              <tr>
                <th >Name</th>
                <th >Username</th>
                <th >Email</th>
                <th >Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users != undefined ? (
                  users.map(users =>
                    <tr key={users._id}>
                      <td>{users.firstname}</td>
                      <td>{users.lastname}</td>
                      <td>{users.email}</td>
                      {/* <td>{users.role}</td> */}
                      {/* <td><a className='btn btn-warning'
                        href={`/edituser/${users._id}`}
                      ><RiEdit2Line />
                      </a></td> */}
                      <td >
                        <button  className="btn btn-warning"
                        onClick={()=>getUserById(users)}>
                        <RiEdit2Line />
                        </button>
                      
                     </td>
                      <td><button
                        className="btn btn-primary"
                        onClick={() => { del(users) }}
                      ><RiDeleteBin6Line />
                      </button></td>
                    </tr>
                  )
                )
                  : (
                    <tr>No data</tr>
                  )
              }
            </tbody>
          </Table>
 {/* <ul>
        {renderPageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>  */}
        </div>
      {/* )} */}

      {editView &&(
        <div>
         {/* <EditUser /> */}
         <div className="add-project">
                    <div className="app-wrapper">
                    <div className='close-icon' onClick={() => setEditView(!editView)}>
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
        </div>
      )}


      {showadduser && (
        <>
          {/* <div style={{ marginTop: '30px' }}>
            <a style={{ float: 'right' }} className='add-user-link' onClick={() => setShowadduser(!showadduser)}>Manage Users</a>
          </div> */}

          <div className="add-project">
            <div className="app-wrapper">
            <div className='close-icon' onClick={() => setShowadduser(!showadduser)}>
                <AiOutlineClose />
              </div>
              <div>
                <h2 className="title" style={{ marginTop: '10px' }}>
                  Create User
                </h2>
              </div>
              <form >
                <div className="firstname">
                  <label > Name</label>
                  <input type="text"
                    id="create-account-firstname"
                    className="input"
                    name="firstname"
                    value={inputs.firstname}
                    onChange={handleChange}
                    placeholder="Name" />
                </div>
                {/* {errors.firstname && <p className="error">{errors.firstname}</p>} */}
                <div className="lastname">
                  <label >User Name</label>
                  <input type="text"
                    id="create-account-lastname"
                    className="input"
                    name="lastname"
                    value={inputs.lastname}
                    onChange={handleChange}
                    placeholder="User Name" />
                </div>
                {/* {errors.lastname && <p className="error">{errors.lastname}</p>} */}
                <div className="email">
                  <label >Email</label>
                  <input type="email"
                    id="create-account-email"
                    className="input"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder="Email" />
                </div>

                <div className="role">
                  <label >Role</label>
                  <br />
                  <div >
                    <select type="text"
                      name="role"
                      className='input'
                      value={inputs.role}
                      onChange={handleChange}
                      placeholder="Role"
                      style={{ width: '400px', height: '40px' }} >
                      <option value="0" style={{ color: 'black' }} className='input'>Choose Your Role</option>
                      <option style={{ color: "black" }} value="Admin" className='input'>Admin</option>
                      <option style={{ color: "black" }} value="User" className='input'>User</option>
                    </select>
                  </div>
                </div>

                <div className="password">
                  <label >Password</label>
                  <input type="password"
                    id="create-account-password"
                    className="input"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="password" />
                </div>

                {/* <div className="cpassword">
                            <label >Confirm Password</label>
                            <input type="password"
                                id="create-account-cpassword"
                                className="input"
                                name="cpassword"
                                value={values.cpassword}
                                onChange={handleChange}
                                placeholder="Confirm password" />

                        </div>
                        {errors.cpassword && <p className="error">{errors.cpassword}</p>} */}

                <button type="submit" className="submit" onClick={handleSubmit} >
                  Add User
                </button>
                <br />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}


export default Admin

