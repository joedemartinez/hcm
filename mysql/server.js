//constants
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors') //CORS policy: No 'Access-Control-Allow-Origin' h 
const mysql = require('mysql')
const server = express()
server.use(bodyParser.json()) 
server.use(cors()) //CORS policy: No 'Access-Control-Allow-Origin' h

//establish db conn
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hcm"
})

//check for conn error
conn.connect(function (err) {
    if(err){
        console.log("Oops!! Error Occured")
    }else{
        console.log("DB connected successfully!!")
    }
})

//port listening
server.listen(8080, function check( err) {
    if(err){
        console.log("Oops!! Error Occured")
    }else{
        console.log("Started...")
    }
})


//DASHBOARD VALUES
//counting items in tables => emp, user, units, promotions
server.get("/api/count/users", (req, res) => { //users
    let sql = "SELECT count(*) as count FROM users_table"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Users")
        }else{
            res.send({status: true, data: results})
        }
    })
})
server.get("/api/count/emps", (req, res) => { //employees
    let sql = "SELECT count(*) as count FROM emp_table"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Employees")
        }else{
            res.send({status: true, data: results})
        }
    })
})
server.get("/api/count/units", (req, res) => { //units
    let sql = "SELECT count(*) as count FROM units_table"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Units")
        }else{
            res.send({status: true, data: results})
        }
    })
})
server.get("/api/count/exits", (req, res) => { //exits
    let sql = "SELECT count(*) as count FROM exits_table"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Exits")
        }else{
            res.send({status: true, data: results})
        }
    })
})


//EMPLOYEES
//Employees data table
server.get("/api/employees", (req, res) => {
    let sql = "SELECT `id`,`emp_id`,concat(`emp_firstname`, ' ',`emp_middlename`, ' ',`emp_surname`) as 'name',`emp_gender`,`emp_dob`,`emp_email`,`emp_currentgrade`,`emp_dateoffirstappointment`,`emp_dateofpresentappointment`,`emp_highestqualification`,`emp_staffstatus`,`emp_yearswithministry`,`emp_maritalstatus`,`emp_phoneno`,`photo`, (select name from units_table WHERE unit_id = emp.unit_id) as Unit FROM `emp_table` emp;"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Employees")
        }else{
            res.send({status: true, data: results})
        }
    })
})
//add new employee
server.post("/api/employees/add", (req, res) => {
    let {emp_id, emp_surname, emp_firstname, emp_middlename, emp_gender, emp_dob, emp_email, emp_highestqualification, emp_staffstatus, emp_yearswithministry, emp_maritalstatus, emp_phoneno, photo, unit_id} = req.body

    let sql = "INSERT INTO emp_table (emp_id, emp_surname, emp_firstname, emp_middlename, emp_gender, emp_dob, emp_email, emp_highestqualification, emp_staffstatus, emp_yearswithministry, emp_maritalstatus, emp_phoneno, photo, unit_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) " 
    conn.query(sql, [emp_id, emp_surname, emp_firstname, emp_middlename, emp_gender, emp_dob, emp_email, emp_highestqualification, emp_staffstatus, emp_yearswithministry, emp_maritalstatus, emp_phoneno, photo, unit_id], (err, results) => {
        if(err){
            res.send({status: false, message: "Oops! Error occured, unable to add employee"})
        }else{
            res.send({status: true, message: "New Employee added Successfully"})
        }
    })
})


//UNITS
//Add Employee modal
server.get("/api/units", (req, res) => {
    let sql = "SELECT * FROM `units_table`;"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Units")
        }else{
            res.send({status: true, data: results})
        }
    })
})



//POSTINGS
//view records
server.get("/api/postings", (req, res) => {
    let sql = "SELECT *, (Select concat(emp_firstname, ' ', emp_middlename, ' ', emp_surname) from emp_table  where emp_id = pt.emp_id)as name FROM `postings_table` pt"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Postings")
        }else{
            res.send({status: true, data: results})
        }
    })
})






//view records
server.get("/api/users", (req, res) => {
    let sql = "SELECT * FROM users_table"
    conn.query(sql, function(err, results){
        if(err){
            console.log("Oops! Error Fetching Users")
        }else{
            res.send({status: true, data: results})
        }
    })
})

//insert data
server.post("/api/users/add", (req, res) => {
    let {emp_id, password, user_type, status, CreatedBy} = req.body


    let sql = "INSERT INTO users_table (emp_id, password, user_type, status, CreatedBy) VALUES (?,?,?,?,?) " 
    conn.query(sql, [emp_id, password, user_type, status, CreatedBy], (err, results) => {
        if(err){
            res.send({status: false, message: "Oops! Error occured, user not created"})
        }else{
            res.send({status: true, message: "User Created Successfully"})
        }
    })
})

//search records
server.get("/api/users/:id", (req, res) => {
    let emp_id = req.params.id;
    let sql = "SELECT * FROM users_table WHERE emp_id = '" + emp_id +"'";
    conn.query(sql, (err, results) => {
        if(err){
            console.log(sql)
            console.log("Oops! Error occured, user not found")
        }else{
            res.send({status: true, data: results})
        }
    })
})


//update records
server.put("/api/users/update/:id", (req, res) => {
    let sql = "UPDATE users_table SET user_type ='" + req.body.user_type + "', status ='" + req.body.status + "' WHERE emp_id ='" +req.params.id +"'";

    conn.query(sql, (err, results) => {
        if(err) {
            res.send ({ status: false, message: "User Update Failed"})
        }else{
            res.send ({ status: true, message: "User Update Successful"})
        }
    })
})


//delete records
server.delete("/api/users/delete/:id", (req, res) => {
    let sql = "DELETE FROM users_table WHERE emp_id ='" + req.params.id + "'";
    conn.query(sql, (err) => {
        if(err){
            res.send({ status: false, message: "Users Deleted Failed"})
        } else {
            res.send ({ status: true, message: "User Delete Successful"})
        }
    })
})