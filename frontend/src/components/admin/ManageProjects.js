
import React, { useState, useEffect, filter } from 'react';
import axios from 'axios';
// import logout from './logout';
import { Table, Button } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'

import AddProjectForm from '../AddProjects/AddProjects';
import './manageproject.css';


const ViewProject = () => {
  // var storing = localStorage.getItem('currentUser');
  // var currentuser = JSON.parse(storing)

  // constructor(props) {

  //   super(props);
  //   this.state = {
  //     projects: [],
  //   }
  // }


  const [projects, setProjects] = useState();
  const [showaddproject, setShowaddproject] = useState();
  const [showAssignees, setShowAssignees] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [users, setUsers] = useState();
  const [assigne, setAssigne] = useState([]);

  const [total, setTotal] = useState([]);
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


  // const [assigned, setAssigned]=useState([])
  //get All Users
  const getProjects = () => {
    axios.get('http://localhost:8000/projects').then(res => {

      if (res.data.success) {

        console.log("projectss list", res.data.projects)
        // this.setState({
        //   projects: res.data.projects,

        // });

        var projectDetails = res.data.projects, i = 0, j = 0;

        projectDetails.forEach(element => {


          setAssigne([]);
          const Assigned = [];
          for (j = 0; j < element.options.length; j++) {


            // setAssigne(element.options.firstname);
            Assigned.push(element.options[j].firstname)

            const NewAssigned = [...assigne, Assigned];
            setAssigne(NewAssigned);
            console.log("Its working", Assigned, assigne);

            if (assigne == null) {
              console.log("valueeeeee")
            }
            else {

            }

            // setAssigned([element.options[j].firstname])
          }

          // setAssigne(Assigned);
          console.log("Its working 2", Assigned, assigne);

          // setTotal([...total, Assigned]);
          setTotal(total => [...total, Assigned]);
          // setTotal(Assigned);
          console.log("total", total)

          // console.log("first name",assigned)
          // console.log("Element", element.options);
          // element.options.forEach(option=>{
          //   //console.log("options",option);

          //     // projectDetails[i].assignto = option.firstname;
          //     setAssigne(option.firstname);
          //     console.log("assign tooo",option.firstname)

          //    // console.log("array",assigne)
          //   //  setAssigne(option.firstname);
          //    //console.log("array second",assigne)

          //   //  const updatedValues = [...assigne,option.firstname];

          //   //  console.log("updated values",updatedValues,assigne)

          //   //  if(assigne.length==0){
          //   //   setAssigne(option.firstname);
          //   //  }
          //   //  else{
          //   //   setAssigne(option.firstname);
          //   //  }

          //    console.log("assingeesssss",assigne);

          //  j++;

          // })

          // if (element.options != undefined) {
          //   projectDetails[i].assignto = element.options.firstname;

          //   console.log("project details",projectDetails[i].assignto)
          // }
          // else {
          //   projectDetails[i].assignto = "";
          // }
          i++;

          // console.log("in assign",Assigned);
        });

        console.log("Its working 3", assigne);
        // if (assigne.trim() !== '') {
        //   setAssignes([...assignes, assigne]);
        //   setAssigne('');
        // }
        // console.log("assingeesssss",assigne);

        setProjects(projectDetails)
        //this.state.users.sort();
        //console.log("Error varaatha code", projectDetails);
        // window.processData("mydata");l
      }

    });
    // console.log("in assign",Assigned);
    // console.log("assigned",Assigned)
  }
  console.log("total out", total)
  console.log("Its working 4", assigne);
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

    //   alert(inputs);
    console.log("hhh", selectedOptions)
    // let total={inputs,selectedOptions}

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
                    <td>{projects.description}</td>{
                      projects.options.map(
                        option=><div  key={option._id} >
                         {option.firstname}
                        </div>
                      )
                    }
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
                    <td><a className='btn btn-warning'
                      href={`/editproject/${projects._id}`}
                    ><RiEdit2Line />
                    </a></td>
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


                    <select multiple type="text"
                      name="assignto"
                      className='input'
                      value={selectedOptions}
                      onChange={handleOptionChange}
                      placeholder="Role"
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

    </>
  )
}


export default ViewProject

