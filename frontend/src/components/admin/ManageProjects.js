
import React, { useState, useEffect, filter } from 'react';
import axios from 'axios';
// import logout from './logout';
import { Table, Button } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import AddProjectForm from '../AddProjects/AddProjects';
import './manageproject.css';
import valid from './valid';

const ViewProject = () => {
  // var storing = localStorage.getItem('currentUser');
  // var currentuser = JSON.parse(storing)
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     projects: [],
  //   }
  // }

  const navigate = useNavigate()
  const [projects, setProjects] = useState();
  const [showaddproject, setShowaddproject] = useState();
  const [showAssignees, setShowAssignees] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [users, setUsers] = useState();
  const [assigne, setAssigne] = useState([]);
  const [projAllocated, setProjallocated] = useState([]);
  const [total, setTotal] = useState([]);
  const [totalPersons,setTotalPersons]=useState([]);
  // const [assignes, setAssignes] = useState([]);
  //   users=this.state.users;
  //lifecycle hook for get users
  // componentDidMount() {
  //   this.getProjects();
  // }


  useEffect(() => {
    getProjects();
    getUsers();
  }, [])


  //get All Users
  const getProjects = () => {
    axios.get('http://localhost:8000/projects').then(res => {

      if (res.data.success) {


        var projectDetails = res.data.projects, i = 0, j = 0;

        projectDetails.forEach(element => {


          setAssigne([]);
          const Assigned = [];
          for (j = 0; j < element.options.length; j++) {

            Assigned.push(element.options[j].firstname)

            const NewAssigned = [...assigne, Assigned];
            setAssigne(NewAssigned);

          }

          setTotal(total => [...total, Assigned]);
          i++;
        });


        setProjects(projectDetails)
        //this.state.users.sort();
        //console.log("Error varaatha code", projectDetails);
        // window.processData("mydata");l
      }

    });
    // console.log("in assign",Assigned);
    // console.log("assigned",Assigned)
  }
  // console.log("total out", total)
  // console.log("Its working 4", assigne);
  //get All Users
  const getUsers = () => {
    axios.get('http://localhost:8000/users').then(res => {

      if (res.data.success) {
        // this.setState({
        //   users: res.data.users,

        // });
        setUsers(res.data.users)
        //this.state.users.sort();
        // console.log("users", users)

      }
    });
  }




  //Delete User
  const del = (projects) => {

    var option = window.confirm(`Are You sure Want to delete  ${projects.projectname}`)
    if (option) {
      axios.delete(`http://localhost:8000/deleteTask/${projects._id}`).then(res => {

        console.log("Deleted Successfully", res)
        alert("Deleted Successfully")
        getProjects();

      })
    }
  }


  //filter function for searching
  const filterContent = (projects, searchTerm) => {
    console.log(projects)
    const result = projects.projects.filter((project) => project.projectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    )

    // this.setState({ projects: result });

    setProjects(result)

  }

  //Search Function
  const handleTextSearch = (event) => {

    const searchTerm = event.currentTarget.value;
    axios.get('http://localhost:8000/projects').then(res => {
      if (res.data.success) {
        filterContent(res.data, searchTerm)
      }
    })
  };

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(inputs => ({ ...inputs, [name]: value }))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/addproject", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...inputs,
        options: selectedOptions,
      }),
    })
      .then(res => {

        alert(res.data.message)
        console.log("ImGE", res.data)
        //localStorage.setItem('currentUser', JSON.stringify(res.data))
        // navigate('/admin')
        // alert(res.data.message)
        setShowaddproject(!showaddproject);
        getProjects();

      })
  }


  const handleImage = (event) => {
    setInputs({ ...inputs, projectImage: event.target.files[0] })
  }

  const handleOptionChange = (event) => {
    const { options } = event.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedOptions(selectedValues);
    console.log("selected options", selectedOptions);
  };

  const viewAssignees = () => {

  }

  const [values, setValues] = useState({
    projectname: "",
    description: "",

   

  })
  const [editView, setEditView] = useState();
  const [myArray, setMyArray] = useState([]);
  //get user by id
  const getProjectById = (projects) => {
    setEditView(!editView);
    console.log("id in useEffect", users)
    axios.get(`http://localhost:8000/projects/${projects._id}`).then(res => {

      if (res.data.success) {

        setValues(res.data.projects)
        // console.log("valuess", res.data.projects);

        let options = res.data.projects.options

        // console.log("options", options, users)
        setMyArray([])
        const AssignedPerson = [];
        for (let i = 0; i <= options.length - 1; i++) {

          for (let j = 0; j <= users.length - 1; j++) {
            if (options[i] == users[j]._id) {

              // console.log("name", users[j].firstname, users[0]._id)
              AssignedPerson.push(users[j].firstname);
              // const newArray = [users[j].firstname];
              setMyArray((myArray)=>[...myArray, users[j].firstname]);
    // setMyArray(newArray);
              // const NewAssigned = [...assigne, Assigned];
              // setAssigne(NewAssigned);
              // const NewAssignedPerson = [...projAllocated,AssignedPerson];

              // console.log("people",NewAssignedPerson[0])
              // setProjallocated(users[j].firstname);
              // setProjallocated(NewAssignedPerson);
              // setProjallocated(NewAssignedPerson);
              // console.log("project allocation",projAllocated);
            }
          }
          // setTotalPersons(totalPersons => [...totalPersons, projAllocated]);
          // console.log("Prsonn",totalPersons);
        }
       // useEffect to log the updated myArray

        // console.log("people outt",AssignedPerson)
        // setProjallocated( (projAllocated) => [...projAllocated,AssignedPerson])
        
      }
    });
  }

  useEffect(() => {
    console.log("my array", myArray);
  }, [myArray]);


  const handleInputChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const nameValid = /^[A-z][A-z]{3,23}$/;
  const [errors, setErrors] = useState({});
  const editProject = (event) => {

    event.preventDefault();
    setErrors(valid(values));
    const { projectname, description,myArray } = values;
    if (nameValid.test(projectname)) {
      const data = {
        projectname: projectname,
        description: description,
        myArray:myArray
      };
      console.log("data",data)
      axios.put(`http://localhost:8000/projects/update/${projects._id}`, data).then((res) => {
        if (res.data.success) {
          console.log("Updated Successfully")
          alert(res.data.message)
          navigate('/admin')
        }
      });
    }
  };

  return (
    <>
      <div className='"table table-striped"' style={{ marginTop: "20px" }}>
        <div className='manage d-flex justify-content-center'>
          <div className='manage-heading' >Manage Projects</div>
        </div>

        <div className='search-add'>
          <div className='search-bar'>
            {/* <label>Search  <BsSearch /></label>&nbsp; */}
            <input type="search"
              placeholder="search..."
              name='searchTerm'
              onChange={handleTextSearch} />
          </div>
          <div>
            <a className='add-project-link' onClick={() => setShowaddproject(!showaddproject)}>Add Project</a>
          </div>
        </div>

        {showAssignees && (
          <div style={{ color: "red" }}>
            Hello
          </div>
        )}

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th >Project Name</th>
              <th >Description</th>
              <th>Assigned to</th>
              {/* <th >Project Image</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              projects != undefined ? (
                projects.map(projects =>
                  <tr key={projects._id}>
                    <td>{projects.projectname}</td>
                    <td>{projects.description}</td>
                    <td >
                    {
                      projects.options.map(
                        option => <div key={option._id} >
                          {option.firstname}
                        </div>
                      )
                    }
                      </td>
                    {/* <td>{projects.options[0].firstname}</td> */}
                    {/* <td  onClick={() => setShowAssignees(!showAssignees)}><button>view</button></td> */}


                    {/* {total.map((array, index) => (
        <div key={index}>
          {array.map((value, innerIndex) => (
            <span key={innerIndex}>{value} </span>
          ))}
        </div>
      ))} */}
                    {/* <td >
                      {total.map((value, index) => (
                        <div key={index}>
                          {value}
                        </div>
                      ))}
                    </td> */}

                    {/* <td>{projects.assignto}</td> */}
                    {/* <td>{projects.projectimage}</td> */}
                    <td>
                      {/* <a className='btn btn-warning'
                      href={`/editproject/${projects._id}`}
                    ><RiEdit2Line />
                    </a> */}

                      <button className='btn btn-warning' onClick={() => { getProjectById(projects) }}

                      ><RiEdit2Line />
                      </button>
                    </td>
                    <td><button
                      className="btn btn-primary"
                      onClick={() => { del(projects) }}
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

      {showaddproject && (
        <>
          {/* <div style={{ marginTop: '30px' }}>
            <a style={{ float: 'right' }} className='add-user-link' onClick={() => setShowaddproject(!showaddproject)}>Manage Projects</a>
          </div> */}
          {/* <AddProjectForm /> */}


          <div className="container add-project">
            <div className="app-wrapper">
              <div className='close-icon' onClick={() => setShowaddproject(!showaddproject)}>
                <AiOutlineClose />
              </div>
              <div>
                <h2 className="title" style={{ marginTop: '10px' }}>
                  Create Project
                </h2>
              </div>

              <form method="post" enctype="multipart/form-data" >
                <div className="projectname">
                  <label >Project Name</label>
                  <input type="text"
                    id="create-account-firstname"
                    className="input"
                    name="projectname"
                    value={inputs.projectname}
                    onChange={handleChange}
                    placeholder="Project Name" />
                </div>
                {/* {errors.projectname && <p className="error">{errors.projectname}</p>} */}
                <div className="description">
                  <label >Description</label>
                  <input type="text"
                    id="create-account-lastname"
                    className="input"
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    placeholder="Desription" />
                </div>
                {/* {errors.description && <p className="error">{errors.description}</p>} */}


                <div className="role">
                  <label >Assign to</label>
                  <br />
                  <div >
                    <select multiple
                      name="assignto"
                      id="dropdown"
                      className='assign-to'
                      value={selectedOptions}
                      onChange={handleOptionChange}

                    >
                      {
                        users.map(users =>
                          <option value={users._id}>{users.firstname}</option>
                        )
                      }
                    </select>

                    {/* <select multiple type="text"
                      name="assignto"
                      className='input'
                      value={inputs.assignto}
                      onChange={handleChange}
                      placeholder="Role"
                      >
                      {

                        users.map(users =>

                          <option value={users._id}>{users.firstname}</option>
                        )
                      }
                    </select> */}
                  </div>
                </div>

                {/* image upload */}

                {/* <div>
                  <label >Project Image</label>
                  <input type="file" name="projectImage"
                    onChange={handleImage} /> */}
                {/* {values &&
                                <div>
                                    <span>{values.projectImage}</span>
                                    <img src={URL.createObjectURL(file)} />
                                </div>
                            } */}
                {/* </div> */}

                <button type="submit" className="submit" onClick={handleFormSubmit} >
                  Add Project
                </button>
                <br />
              </form>
            </div>
          </div>






        </>
      )}



      {
        editView && (
          <div className='add-project'>
            <div className="app-wrapper">

              <div >
                <div className='close-icon' onClick={() => setEditView(!editView)}>
                  <AiOutlineClose />
                </div>
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

                <div className="role">
                  <label >Assign to</label>
                  <br />
                  <select multiple
                    name="assignto"
                    id="dropdown"
                    className='assign-to'
                    value={myArray}
                    onChange={handleOptionChange}
                  >
                    {
                      users.map(users =>
                        <option value={users.firstname}>{users.firstname}</option>
                      )
                    }
                    <option>{projAllocated[0]}</option>
                  </select>
                </div>
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
                <button type="submit" className="submit" onClick={editProject} >
                  Save
                </button>
                <br />
              </form>
            </div>
          </div>
        )
      }

    </>
  )
}


export default ViewProject

