
import React, { useState, filter, useEffect } from 'react'
import axios from 'axios';
import logout from '../logout';
import { Table, Button } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import AddUser from '../AddUser/AddUser'


const Admin = () => {
  // var storing = localStorage.getItem('currentUser');
  // var currentuser = JSON.parse(storing)
  //  navigate = useNavigate();
  // constructor(props) {

  //   super(props);
  //   this.state = {
  //     users: [],
  //   }
  // }
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
        //this.state.users.sort();
        console.log("users", users)

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


  return (

    <>
      {/* <h1 className="form-success mt-5">Welcome Admin ! </h1> */}
      {/* <div style={{ marginTop: '30px' }}>
          <a style={{ float: 'right' }} className='add-user-link' href="/adduser">Add Users</a>
        </div> */}


      {!showadduser && (
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

          <Table striped bordered hover variant="dark">
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
                      <td><a className='btn btn-warning'
                        href={`/edituser/${users._id}`}
                      ><RiEdit2Line />
                      </a></td>

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
        </div>
      )}


      {showadduser && (
        <>
          <div style={{ marginTop: '30px' }}>
            <a style={{ float: 'right' }} className='add-user-link' onClick={() => setShowadduser(!showadduser)}>Manage Users</a>
          </div>





          <div className="container register-section">
            <div className="app-wrapper">
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

