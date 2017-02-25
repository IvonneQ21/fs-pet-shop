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
app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var responsePets = JSON.parse(petsJSON);

    if (id < 0 || id >= responsePets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(responsePets[id]);
  });
});
app.use(function(req, res) {
  res.sendStatus(404);
});
app.listen(port, function() {
  console.log('we are succesfully running ! yahhh!', port);
});


//another way to writting the second part of the request.
// app.get('/pets/:id', function(req, res){
//   var petIndex = req.params.id;
//   var numPets = pets.length;
//
//   if(petIndex >=0 && petIndex<numPets){
//     res.send(pets[petIndex]);
//   }
//   else{
//     return res.sendStatus(404);
//     res.send('Not Found');
//   }
// });
//
// app.listen('8000', function(){
//   console.log('Server 3000 started');
// });
