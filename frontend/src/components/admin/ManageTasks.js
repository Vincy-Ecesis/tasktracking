
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
  const [status, setStatus] = useState();
  const [selectedValue, setSelectedValue] = useState([]);
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


  useEffect(() => {
    getTasks();
    getProjects();
   
     
  }, [])


 //get All tasks
 const getTasks = () => {
  axios.get('http://localhost:8000/tasks').then(res => {

    if (res.data.success) {
      setTasks(res.data.tasks)
      //this.state.users.sort();
    }
  });
}

  //filter function for searching
  const filterContent = (tasks, searchTerm) => {
    
    
    const result = tasks.tasks.filter((task) => task.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.dailytask.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.date.toLowerCase().includes(searchTerm.toLowerCase())
    )
 
    
    // this.setState({ tasks: result });
    setTasks(result)
  }

  //Search Function
  const handleTextSearch = (event) => {

    const searchTerm = event.currentTarget.value;
    axios.get('http://localhost:8000/tasks').then(res => {
    
    
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
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/dailytask", inputs)
      .then(res => {

        alert(res.data.message)
      
        
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



  const statusChange = (event, id) => {
    event.persist();
    const value = event.target.value;

    //convert it in object
    let selectedValue = {
      status: value
     
    };
    setStatus(selectedValue);
    axios.put(`http://localhost:8000/dailytaskStatus/update/${id}`,selectedValue).then(res => {
    
      if (res.data.success) {
        setStatus(res.data.data.status);
        getTasks();
      }
    })
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
              <th >Task</th>
              <th >Project</th>
              <th >Due Date</th>
              <th >Status</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks != undefined ? (
                tasks.map(tasks =>
                  <tr key={tasks._id} className={tasks.status==3 ?"completed-task":"normal-task"}>
                    
                    <td>{tasks.username}</td>
                    <td>{tasks.dailytask}</td>
                    <td>{tasks.project}</td>
                    <td>{tasks.estimatedtime}</td>
                    <td><button><select type="number" name="status" value={tasks.status}
                      onChange={(event) => statusChange(event, tasks._id)}
                    >
                      <option value="">Select</option>
                      <option value="0">Open</option>
                      <option value="1">InProgress</option>
                      <option value="2">Onhold</option>
                      <option value="3">Completed</option>
                    </select></button></td>
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
              <div className='close-icon' onClick={() => setShow(!show)}>
                <AiOutlineClose />
              </div>
              <div>
                <h2 className="title" style={{ marginTop: '10px' }}>
                  Daily Task
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-name">
                  <label>Enter your name:  </label>
                  <input
                    type="text"
                    name="username"
                    id="create-account-firstname"
                    className="input"
                    value={inputs.username || ""}
                    onChange={handleChange}
                  />

                </div>
                <div className="input-name">
                  <label >Enter the Project</label>
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
                          <option value={projects.projectname}>{projects.projectname}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className="input-name">
                  <label>Enter  task:</label>
                  <input
                    type="text"
                    name="dailytask"
                    id="create-account-firstname"
                    className="input"
                    value={inputs.dailytask || ""}
                    onChange={handleChange}
                  />
                </div>
                {/* <div>
                  <label >Assigned To:</label>
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
                  </div> */}
               <div className="input-name">
                  <label>Enter Estimated time:</label>
                  {/* <input
                                type="number"
                                name="time"
                                className="input"
                                value={inputs.time || ""}
                                onChange={handleChange}
                            /> */}

                  <input type="datetime-local" name="estimatedtime" className='input' value={inputs.estimatedtime} onChange={handleChange} />
                </div>
                {/* <div>
                  <label>Status</label>
                  <div >
                    <select type="number"
                      name="status"
                      className='input'
                      value={inputs.status}
                      placeholder="status"
                    >
                      <option value="">Select</option>
                      <option value="0">InProgress</option>
                      <option value="1">Onhold</option>
                      <option value="2">Completed</option>
                    </select>
                  </div>
                </div> */}
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

