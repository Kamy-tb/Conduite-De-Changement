var express = require("express");
var app = express();
var mysql = require("mysql");
const bodyParser = require('body-parser');
const multer = require('multer')
app.use(express.static('images')) ;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Connect to mysql 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'mpsi_db',
});
connection.connect();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

// get Ateliers / etats
 app.get('/getinfos',function(req,res){   
    var query="select a.nom  ,u.nom_user  , e.date  , e.etat_actuel  , e.etat_future  from atelier a join etat e on a.atelier_id = e.atelier_id join user u on u.user_id = e.user_id"
    connection.query(query,function(error,results){
       if (error) {
           console.log(error)
           res.status(500).json({message:"server error"}) 
       }
    
       res.status(200).json(results)
   })
});

// get user
app.get('/getuser/:nom_user/:pwd',function(req,res){
    var data = null    
    var query="select * from user where nom_user=? and pwd=?"   
    connection.query(query,[req.params.nom_user,req.params.pwd],function(error,results){
       if (error) {
           console.log(error)
           res.status(500).json({message:"server error"}) 
       }
       if(results.length>0) {
           data = results[0]
       }
       res.status(200).json(data)
   })
   });

 // get Ateliers
 app.get('/getatelier',function(req,res){   
    var query="select nom  from atelier"
    connection.query(query,function(error,results){
       if (error) {
           console.log(error)
           res.status(500).json({message:"server error"}) 
       }
    
       res.status(200).json(results)
   })
});

// add Etat
app.post('/addetat',function(req,res){  
    // si on insere toutes les colonnes on est pas oubliger de specifier 
    var query="INSERT INTO etat (etat_actuel , etat_future , user_id ,atelier_id) values (? ,? , ? ,? )"
    connection.query(query , [req.body.etat_actuel  , req.body.etat_future , req.body.user_id,req.body.atelier_id ],function(error,results){
       if (error) {
           console.log(error)
           res.status(500).json({message:"server error"}) 
       }
       res.status(200).json("success")
   })
});

var server = app.listen(8082,function(){
    var host = server.address().address
    var port = server.address().port
});