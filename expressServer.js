'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = './pets.json';
//could have also written it as follo:
 // let petsPath = path.join(__dirname, 'pets.json');
let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

//route to pets
// let pets = '/pets.json'
app.disable('x-powered-by');

app.get('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    // console.log(typeof petsJSON);
    // let petIndex = req.params.id;
    // let numPets = pets.length;
    if(readErr) {
      // throw readErr;
       console.error(readErr.stack);
      return res.sendStatus(500);
    }
    let responsePets = JSON.parse(petsJSON); //petsJSON was a string format.
    // console.log(typeof responsePet);
    res.send(responsePets);
  // console.log(curPets);
  });
});
// allowing server to send individual records based on the path and the item located
//at the id. index of the array.
//NOTE: the /:id (route parameter) is adding a dynamic route to the application. NOTE: id is a variable
//name this can be anything.
app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    let id = parseInt(req.params.id);
    //giving a variable name to the route of req.params.id
    let responsePets = JSON.parse(petsJSON);

    if (id < 0 || id >= responsePets.length || isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'application/json');
    res.send(responsePets[id]);
  });
});

// note might want to use bodyParser() and milter. //These are middleware.
  app.post('/pets', function(req, res){
    fs.readFile(petsPath, function(readErr, petsJSON) {
      if(readErr) {
        console.error(readErr.stack);
        return res.sendStatus(400);
      }
      // creating the class of the req that must be passed.
          let curPets = JSON.parse(petsJSON);
          let givenPet = req.body;
          //  console.log(givenPet);
          if(!givenPet){
            return res.sendStatus(400);
          }
          //simplifying the given body values;
          let age = parseInt(req.body.age);
          let kind = req.body.kind;
          let name = req.body.name;
          // req.body.pro appeds
          //creatring the object.
      if ( age && kind && name ) {
        curPets.push(givenPet);
      }
        let newPetsJSON = JSON.stringify(curPets);

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
          if(writeErr) {
            console.error(writeErr.stack);
            return res.sendStatus(500);
          }
          res.set('Content-Type', 'application/json');
          res.send(responsePets[id]);
          // console.log(givenPet);
        });
      // }
    });
  })
app.use(function(req, res) {
  res.sendStatus(404);
});
app.listen(port, function() {
  console.log('Listening on port', port);
});



// exporting the server.

//attempting the bonus.

module.exports = app;
