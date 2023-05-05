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
    let data = {
        "user_id": 0,
        "emp_id": req.body.emp_id,
        "password": req.body.password,
        "user_type": req.body.user_type,
        "status": 0,
        "CreatedOn": '',
        "CreatedBy": req.body.CreatedBy
    }
    let sql = "INSERT INTO users_table SET ? " 
    conn.query(sql, (err) => {
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
    conn.query(sql, function(err, results){
        if(err){
            console.log(sql)
            console.log("Oops! Error occured, user not found")
        }else{
            res.send({status: true, data: results})
        }
    })
})