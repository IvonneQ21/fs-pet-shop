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

app.get('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    // console.log(typeof petsJSON);
    let petIndex = req.params.id;
    // let numPets = pets.length;
    if(readErr) {
      throw readErr;
      return res.sendStatus(500);
    }
    let responsePet = JSON.parse(petsJSON); //petsJSON was a string format.
    // console.log(typeof responsePet);
    res.send(responsePet);
  // console.log(curPets);
  });
});
app.listen(port, function() {
  console.log('we are succesfully running ! yahhh!');
});

//
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
