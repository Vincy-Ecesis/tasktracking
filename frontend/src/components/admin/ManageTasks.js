
import React, { useState, useEffect, filter } from 'react'
import axios from 'axios';
import logout from '../logout';
import { Table, Button } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import AddTask from '../AddTask/AddTask';
import { AiOutlineClose } from 'react-icons/ai'


function ViewTasks() {
  // var storing = localStorage.getItem('currentUser');
  // var currentuser = JSON.parse(storing)
  //  navigate = useNavigate();
  // constructor(props) {

  //   super(props);
  //   this.state = {

  //     tasks: [],
  //   }
  // }

  const [tasks, setTasks] = useState();

  const [show, setShow] = useState(false);


  // const showaddTask = () => {
  //   setShow(true);
  // }

  // const hideaddTask = () => {
  //   setShow(false);
  // }

  //lifecycle hook for get users
  // componentDidMount() {
  //   this.getTasks();
  // }

  //get All tasks
  const getTasks = () => {
    axios.get('http://localhost:8000/tasks').then(res => {

      if (res.data.success) {
        // this.setState({
        //   tasks: res.data.tasks,


        // });

        console.log("tasks", res.data.tasks);
        setTasks(res.data.tasks)
        //this.state.users.sort();
        console.log("hgghhg", tasks);

      }
    });
  }

  useEffect(() => {
    getTasks();
    getProjects();
  }, [])




  //filter function for searching
  const filterContent = (tasks, searchTerm) => {
    console.log(tasks)
    const result = tasks.tasks.filter((task) => task.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.dailytask.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.date.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log(result)
    // this.setState({ tasks: result });
    setTasks(result)
  }

  //Search Function
  const handleTextSearch = (event) => {

    const searchTerm = event.currentTarget.value;
    axios.get('http://localhost:8000/tasks').then(res => {
      console.log(res.data)
      if (res.data.success) {
        filterContent(res.data, searchTerm)
      }
    })
  };


  // render() {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))

  }

  const [projects, setProjects] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hhh", inputs)
    axios.post("http://localhost:8000/dailytask", inputs)
      .then(res => {

        alert(res.data.message)
        console.log(res.data)
        //localStorage.setItem('currentUser', JSON.stringify(res.data))
        // navigate('/admin')
        setShow(!show);
        getTasks();

      })
  }


  //get All Users
  const getProjects = () => {
    axios.get('http://localhost:8000/projects').then(res => {

      if (res.data.success) {
        // this.setState({
        //   projects: res.data.projects,

        // });

        var projectDetails = res.data.projects, i = 0;

        console.log("projecrs",res.data)

        projectDetails.forEach(element => {

          //console.log("Element", element);

          if (element.projectname != undefined) {
            projectDetails[i].projectname = element.projectname;
          }
          else {
            projectDetails[i].projectname = "";
          }

          i++;

        });


        setProjects(projectDetails)
        //this.state.users.sort();
        //console.log("Error varaatha code", projectDetails);
        // window.processData("mydata");l
      }
    });
  }



  return (

    <>

      {/* <h1 className="form-success mt-5">Welcome Admin ! </h1> */}
      <div style={{ marginTop: '30px' }}>
      </div>
      {/* {!show && ( */}
        <div className='"table table-striped"'>
          <div className='manage d-flex justify-content-center'>
            <div className='manage-heading' >Manage Tasks</div>
          </div>
          {/* <br />&nbsp; */}
          <div className='search-add'>
            <div >
              {/* <label>Search Here <BsSearch /></label>&nbsp; */}
              <input type="search"
                placeholder="search..."
                name='searchTerm'
                onChange={handleTextSearch} />
            </div>
            <div className='search-bar'>
              <a className='add-user-link' onClick={() => setShow(!show)} >Add Task</a>
            </div>
          </div>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th >Name</th>
                <th >Daily Task</th>
                <th >Due Date</th>

              </tr>
            </thead>
            <tbody>
              {
                tasks != undefined ? (
                  tasks.map(tasks =>
                    <tr key={tasks._id}>
                      <td>{tasks.username}</td>
                      <td>{tasks.dailytask}</td>
                      <td>{tasks.estimatedtime}</td>
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
      {/* )} */}

      {show && (
        <>

          {/* <div style={{ marginTop: '30px' }}>

            <a style={{ float: 'right' }} className='add-user-link' onClick={() => setShow(!show)}>Manage Tasks</a>

          </div> */}

          {/* <AddTask /> */}

          <div className="add-project">
            <div className="app-wrapper">
            <div className='close-icon' onClick={()=> setShow(!show)}>
             <AiOutlineClose/>
              </div>
              <div>
                <h2 className="title" style={{ marginTop: '10px' }}>
                  Daily Task
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <label>Enter your name:
                  <input
                    type="text"
                    name="username"
                    id="create-account-firstname"
                    className="input"
                    value={inputs.username || ""}
                    onChange={handleChange}
                  />
                </label>
                <br />
               
                  <label >Project</label>
                  
                  <div >
                    <select type="text"
                      name="project"
                      className='input'
                      value={inputs.project}
                      onChange={handleChange}
                      placeholder="Role"
                      >
                      {

                        projects.map(projects =>

                          <option value={projects._id}>{projects.projectname}</option>
                        )
                      }
                    </select>
                  </div>
                <label>Enter  task:
                  <input
                    type="text"
                    name="dailytask"
                    id="create-account-firstname"
                    className="input"
                    value={inputs.dailytask || ""}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>Enter Estimated time:
                  {/* <input
                                type="number"
                                name="time"
                                className="input"
                                value={inputs.time || ""}
                                onChange={handleChange}
                            /> */}

                  <input type="datetime-local" name="estimatedtime" value={inputs.estimatedtime} onChange={handleChange} />
                </label>
                <br />
                <button type="submit" className="submit"  >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// }
export default ViewTasks

