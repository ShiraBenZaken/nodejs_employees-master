const express = require('express');
const router = express.Router();
const fs=require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'test';
const employeeC=require('./employeeClass');

//הוספת עובד
router.post('/addemployee', function (req, res) {
  // console.log(req.body);
  console.log("ppppppp");
  var emp1=new employeeC(req.body.tz,req.body.fname,req.body.lname,req.body.address,req.body.phone,req.body.mail);
  console.log(emp1);
    res.send('emp');
    MongoClient.connect(url, function(err,client) {
    const col = client.db(dbName).collection('employees');
    col.insert(emp1, function(err, result) {
      console.log(err+"err");
      console.log(result);
    })
    });
      });

// קבלת פרטי כל העובדים
router.get("/getAllEmployees",function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("employees").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
});


// קבלת פרטי עובד מסוים
router.get("/getoneEmp/:t",function(req,res){
  var flag=true;
var ress = req.params.t.slice(2,req.params.t.length);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;   
    var dbo = db.db("test");
  dbo.collection("employees").find({}, { projection: { } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      for (let i= 0; i < result.length&&flag; i++) {
       if(result[i].tz==ress){
         res.send(result[i]);
         flag=false;
       }
      }
      db.close();
    });
  });
})
//מחיקת עובד(שינוי isactive לfalse)
router.get("/delEmp/:t",function(req,res){
  var ress = req.params.t.slice(2,req.params.t.length);
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var myquery = { tz: ress };
  var newvalues = { $set: {isActive:false } };
  //אין צורך לעדכן הרבה כיון שיש לכל עובד תז אחת
  dbo.collection("employees").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});})
  

//עדכון פרטי עובד
  router.post("/updateEmp/:t",function(req,res){
    var ress = req.params.t.slice(2,req.params.t.length);
    console.log(ress);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myquery = { tz: ress };
    var newvalues = { $set: {fname:req.body.fname,lname:req.body.lname,address:req.body.address,phone:req.body.phone,mail:req.body.mail } };
    dbo.collection("employees").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  

    })
module.exports= router;