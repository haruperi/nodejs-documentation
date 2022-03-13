/***************************  CONNECTING TO MONGODB ******************************/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected…'))
    .catch(err => console.error('Connection failed…', err));



/***************************  DEFINING A SCHEMA ******************************/
const courseSchema = new mongoose.Schema({
    _id: Number,
    name: {type: String, required: true},
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean
});

// Creating a model
const Course = mongoose.model('Course', courseSchema);


/*********************************************************************************************************
 *
 *                                       DATABASE OPERATIONS  (CRUD)
 *
 * ******************************************************************************************************/

/*************************** CREATE ******************************/
async function createCourse() {
    try {
        const courses = await Course.insertMany({
            _id: 5,
            name: "CourseName",
            author: "Sylvia",
            tags: ['Money','Finance'],
            isPublished: true
        })
        console.log(courses)
    }
    catch (e) {
        console.log(e.message)
    }

}


/*************************** READ ******************************/
async function getCourses(){
    const courses = await Course.find()
    console.log(courses)
}


/*************************** UPDATE ******************************/
async function updateCourses(){
    const course = await Course.updateOne({author: "Sylvia"}, {$set: {author: "Ruffharis"}})
    console.log(course)
}


/*************************** DELETE ******************************/
async function deleteCourses(){
    const courses = await Course.deleteOne({name: "Node.js Course"})
    console.log(courses)
}

createCourse()