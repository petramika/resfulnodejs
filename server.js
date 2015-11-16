#!/usr/bin/nodejs
/*Parte del codigo extraido de http://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
Parte del codigo adaptado a otro funcionamiento y corregido variables que no estaban correctamente definidas
instalar npm install express --save
parecido a la busqueda de tickets*/

var express = require('express');
var app = express();
var fs = require("fs");
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/listUsers', function ( res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       res.end( data );
   });
})

app.get('/addUser', function ( res) {
   // First read existing users from local file or db
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	//convert text to json
       data = JSON.parse( data );
	//operation with data
       data["user4"] = user["user4"];
	//send response RESTFUL
       res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var ser = data["user" + req.params.id] 
       res.end( JSON.stringify(ser));
   });
})

app.get('/deleteUser/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + req.params.id];
       res.end( JSON.stringify(data));
   });
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
