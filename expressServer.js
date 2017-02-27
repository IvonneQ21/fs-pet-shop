'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = './pets.json';
//could have also written it as follow:
 // let petsPath = path.join(__dirname, 'pets.json');
let express = require('express');
let app = express();
let port = process.env.PORT || 8000;
let bodyParser = require('body-parser');
let morgan = require('morgan');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if(readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }
    let responsePets = JSON.parse(petsJSON);
    res.set('Content-Type', 'application/json');
    res.send(responsePets);
  });
});
// allowing server to send individual records based on the path and the item located
//at the id. index of the array.
//NOTE: the /:id (route parameter) is adding a dynamic route to the application. NOTE: id is a variable
//name this can be anything.

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    let id = parseInt(req.params.id);
    let responsePets = JSON.parse(petsJSON);

    if (!(responsePets[id])){
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    }
    if (id < 0 || id >= responsePets.length || isNaN(id)) {
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    } else {
    res.set('Content-Type', 'application/json');
    res.send(responsePets[id]);
  });
});

// note might want to use bodyParser() and milter. //These are middleware.
  app.post('/pets', function(req, res){
    fs.readFile(petsPath, function(readErr, petsJSON) {
      let curPetsArr = JSON.parse(petsJSON);
      let givenPet = {'age': age, 'kind':kind, 'name': name};
      let age = parseInt(req.body.age);
      let kind = req.body.kind;
      let name = req.body.name;

      if (readErr) {
        console.error(readErr.stack);
        return res.sendStatus(400);
      }
      if(!givenPet) {
        console.error("Needs more information")
        return res.sendStatus(400);
      }

      if ( age && kind && name ) {
        curPetsArr.push(givenPet);
      }
      let newPetsJSON = JSON.stringify(curPetsArr);

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
          if(writeErr) {
            console.error(writeErr.stack);
            return res.sendStatus(500);
          }
          res.set('Content-Type', 'application/json');
          res.send(responsePets);
        });
    });
  });
app.use(function(req, res, next) {
  res.sendStatus(404);
});
app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
