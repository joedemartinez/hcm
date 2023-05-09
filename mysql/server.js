//constants
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const server = express()
server.use(bodyParser.json()) 

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