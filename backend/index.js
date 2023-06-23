
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const keys = require("./config/keys");

//Db connection
var url = "mongodb://0.0.0.0:27017/tasktracking";
mongoose.connect(url, (err) => {
    if (!err) {
        console.log("DB connected successfully")
    }
    else {
        console.log("DB Error", err);
    }
})

//task schema 
const taskSchema = new mongoose.Schema({

    // _id:String,
    username: String,
    dailytask: String,
    project: String,
    status:Number,
    date: {
        type: Date,
        default: Date.now
    },
    estimatedtime: {
        type: Date,
        default: Date.now
    }


})

const Task = new mongoose.model("Task", taskSchema)

//user schema 
const userSchema = new mongoose.Schema({

    // _id:String,
    firstname: String,
    lastname: String,
    email: String,
    role: String,
    password: String,

})

const User = new mongoose.model("User", userSchema)


//Project schema 
const projectSchema = new mongoose.Schema({
    // _id:String,
    projectname: String,
    description: String,
    projectImage: String,
    // assignto: String,
    options: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],

})
const Project = new mongoose.model("Project", projectSchema)

//routes 

//Login
app.post("/Login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password).then((status) => {

                console.log("passw",password,user.password,status);
                if (status) {


                    // const payload = {
                    //     id: user.id,
                    //     name: user.firstname
                 
                    // };
    
                    // const keys = {
                    //     secretOrKey: 'mySecretKey', // Replace with your secret key
                    //   };


                    // const token = jwt.sign(
                    //     {}, // Payload (optional)
                    //     keys.secretOrKey,
                    //     {
                    //       expiresIn: '1y' // 1 year
                    //     }
                    //   );
                    //   console.log("token",token);
                    jwt.sign(
                     {},
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                            
                        },
                        (err, token) => {
                          

                            // req.session.id=user.id;
                            // req.session.save();

                            // localStorage.setItem("UserId", sres.rows.refno);
                            // localStorage.setItem("token", token);

                            // res.send.json({
                            //     success: true,
                            //     message: "Login Success",
                            //     Result: user,
                            //     token: "Bearer " + token
                            // });

                            
                            res.send({  success: true,message: "login successfully", user: user,token: "Bearer " + token })
                        }
                    );

                    res.status = true
                   
                }
                else {

                    res.status = false
                    res.send({ message: "wrong credentials" })
                }
            })
        }
        else {
            res.send({ message: "User not registered" })
        }
    })
});


















//Add User or register 
app.post("/adduser", (req, res) => {

    const { firstname, lastname, role, email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {

            res.send({ message: "user already exist", isRegistered: false })
        }
        else {
            bcrypt.hash(password, 10)
                .then(hashedpassword => {
                    const user = new User({
                        firstname,
                        lastname,
                        role,
                        email,
                        password: hashedpassword,

                    })
                    user.save(
                        res.send({ message: "Successfully Registered.", user: user, isRegistered: true })

                    )
                })
        }
    })
})


//Add Projects
app.post("/addproject", (req, res) => {

    console.log("reques",req.body.body,JSON.parse(req.body.body));
    
    const { projectname, description,options}= JSON.parse(req.body.body);
    console.log("assign to",options);
    const project = new Project({
        projectname,
        description,
        options,
    })
    project.save(
        res.send({ message: "Project Added Successfully.", project: project })
    )
    console.log("Projects", project)
})


//Add Daily tasks
app.post("/dailytask", (req, res) => {
    const { username, dailytask, project, estimatedtime,status } = req.body;
    console.log("req.body", req.body);
    const date = new Date();
    const task = new Task({
        username,
        dailytask,
        project,
        estimatedtime,
        status,
        date
    })
    task.save(
        res.send({ message: "Successfully Registered.", task: task })
    )
    console.log("daily task", task);
})


//update the tasks by id
app.put("/dailytaskStatus/update/:id", async (req, res) => {

    // console.log(id)
    const updateId = req.params.id;
    // const  status  = req.body.status;
    console.log("status node",req.body.status)
    try {

        const updateStatus = await Task.findByIdAndUpdate(updateId, {

            $set: {
               status: req.body.status                
            }
        },{ new: true });

        // Task.status=req.body.status;
        res.status(200).json({
            message: "Successfully Edited",
            success: 'true',
            data: updateStatus
        })
       
    }
    catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        });

    }
})



//task report
app.post("/taskreport", async (req, res) => {
    const { fromDate, toDate } = req.body;

    // console.log("Task Report", req.body)

    //fromDate = "2022-10-01";

    //toDate = "2022-10-30";
    //console.log("From Date", fromDate);

    //console.log("To Date", toDate);

    fromDate1 = new Date(fromDate);

    //console.log("From Date", fromDate);

    toDate1 = new Date(new Date(toDate).setUTCHours(23, 59, 59, 999));

    //console.log("From Date 1", fromDate1);

    //console.log("To Date 1", toDate1);

    Task.find({ date: { $gt: fromDate1 }, date: { $lt: toDate1 } }).exec((err, tasks) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })

        }
        return res.status(200).json({
            success: true,
            tasks: tasks
        })

    })
})


//getAllTasks
app.get("/tasks", async (req, res) => {
    //const role = req.body;
    Task.find().exec((err, tasks) => {
        console.log("tasks list", tasks)
        if (err) {
            // console.log(users)
            return res.status(400).json({
                success: false,
                error: err
            })

        }
        // console.log(tasks)
        return res.status(200).json

            ({
                success: true,
                tasks: tasks
            })

    })

})


//get All Users

app.get('/users', (req, res) => {
    User.find({ role: { $ne: 'admin' } }).exec((err, users) => {

        if (err) {

            return res.status(400).json({
                success: false,
                error: err
            })

        }

        return res.status(200).json

            ({
                success: true,
                users: users
            })

    })
})

// get User By Id
app.get('/users/:id', (req, res) => {

    let userId = req.params.id;
    //console.log(userId)

    User.findById(userId, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json
            ({
                success: true,
                users
            })
    })
})

//update the users by id
app.put("/users/update/:id", async (req, res) => {

    // console.log(id)
    const updateId = req.params.id;
    //console.log(updateId)
    try {

        var updateUser = await User.findByIdAndUpdate(req.params.id, {

            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password,
                cpassword: req.body.password
            }
        });
        res.status(200).json({
            message: "Successfully Edited",
            success: 'true',
            data: updateUser
        })
    }
    catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        });

    }
})

//get all projects
app.get('/projects', (req, res) => {
    // Project.find().exec((err, projects) => {

    Project
        .find()
        .populate('options') // only works if we pushed refs to person.eventsAttended
        .exec(function (err, projects) {
            //Project.aggregate([{ $lookup: {from : "User", localField: "_id", foreignField: "assignto", as : "firstName"}}]).exec((err, projects) => {
            console.log("id as name", projects)
            if (err) {
                // console.log(users)
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }
            console.log("data", projects)
            return res.status(200).json
                ({
                    success: true,
                    projects: projects
                })
        })








    // Project.find().forEach(
    //     function (object) {
    //         var commonInBoth=db.comments.findOne({ "uid": object.uid} );
    //         if (commonInBoth != null) {
    //             printjson(commonInBoth) ;
    //             printjson(object) ;
    //         }else {
    //             // did not match so we don't care in this case
    //         }
    //     });

})

// get Project By Id
app.get('/projects/:id', (req, res) => {

    let projectId = req.params.id;
    console.log(projectId)

    Project.findById(projectId, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json
            ({
                success: true,
                projects
            })
    })
})


// get Project By Id
app.get('/users/projects/:id', (req, res) => {

    let projectId = req.params.id;
    //console.log(projectId)

    Project.find({ assignto: projectId }, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        console.log("projects", projects)
        return res.status(200).json
            ({
                success: true,
                projects
            })
    })
})


//update the projects by Id
app.put("/projects/update/:id", async (req, res) => {

    const updateId = req.params.id;
    console.log(updateId)
    try {
        var updateProject = await Project.findByIdAndUpdate(req.params.id, {

            $set: {
                projectname: req.body.projectname,
                description: req.body.description,
            }
        });
        res.status(200).json({
            message: "Successfully Edited",
            success: 'true',
            data: updateProject
        })
    }
    catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        });

    }
})

// app.put("/update/:id",(req,res)=>{

//     User.findByIdAndUpdate(

//         req.params.id,
//         {
//             $set:req.body,
//         },
//        (err,data)=>{
//            if(err) return res.status(400).json({success:false,err});
//            return res.status(200).json({success:true});

//            }

//     )

// })

//Delete user
app.delete("/delete/:id", async (req, res) => {

    console.log("delete", req.params.id)

    try {

        await User.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: "User Deleted Successfully....!" })
    }
    catch (error) {

        res.status(500).json({ err: error.message || "Error while deleting user" })
    }

})

//Delete Task
app.delete("/deleteTask/:id", async (req, res) => {

    console.log("delete", req.params.id)

    try {

        await Project.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: "Project Deleted Successfully....!" })
    }
    catch (error) {

        res.status(500).json({ err: error.message || "Error while deleting user" })
    }

})


//server Started
app.listen(8000, () => {
    console.log("started")
})
