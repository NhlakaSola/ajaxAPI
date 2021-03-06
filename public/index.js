"use strict"

const {addNewVisitor,listAllVisitors,deleteVisitor} = require('../public/app');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodedParser)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"/index.html"))
})

app.post('/submit-form', async(req, res) => {
    const fName = req.body.fName
    const nameOfAssistant = req.body.nameOfAssistant
    const age = req.body.age
    const dateOfVisit = req.body.dateOfVisit
    const timeOfVisit = req.body.timeOfVisit
    const comments = req.body.comments
    const id = await addNewVisitor(fName,age,dateOfVisit,timeOfVisit,nameOfAssistant,comments);
    res.render("index", { visitorsName: req.body.fName,
                        nameOfAssistant: req.body.nameOfAssistant,
                        age: req.body.age,
                        dateOfVisit: req.body.dateOfVisit,
                        timeOfVisit: req.body.timeOfVisit,
                        comments: req.body.comments,
                        id: id
    });
    res.end()
})

app.get('/viewVisitors',async(req,res)=>{
    const visitor = await listAllVisitors();
    res.send(JSON.stringify(visitor));
    res.end();
})

const server = app.listen(9005,()=>{
    console.log('Server is running on port 9005')
})

module.exports ={server}
