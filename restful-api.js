/**************************************  Other 3rd Party Node Packages    *********************************************/
// Use JOI to validate user input
const Joi = require('joi');

/**************************************  Build a web server   *********************************************************/
const express = require('express');
const app = express();

//If your body is going to have json in it
app.use(express.json())

/**************************************  This Module Global Variables and database  ************************************/
// Simulating a database with fixed values
const courses = [
    {id: 1, name: "Course1"},
    {id: 2, name: "Course2"},
    {id: 3, name: "Course3"}
]


/**************************************  READ data using get() *********************************************************/
// Getting all the courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Getting a single course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found.');

    res.send(course);
});


/************************************** UPDATING data using put() ******************************************************/
// Updating a course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found.');

    //user input validation
    const  schema = { name : Joi.string().min(3).required() }
    const {error} = Joi.validate(req.body, schema)
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name;
    res.send(course)
});


/************************************** CREATING data using post() ******************************************************/
// Creating a course
app.post('/api/courses', (req, res) => {
    const  schema = { name : Joi.string().min(3).required() }

    //user input validation
    const {error} = Joi.validate(req.body, schema)
    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course)
    res.send(course);
});


/************************************** DELETING data using delete() ***************************************************/
// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found.');

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
});



/************************************** OUTPUT display and monitoring *************************************************/
// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`))
