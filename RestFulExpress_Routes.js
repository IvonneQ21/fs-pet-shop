'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = './pets.json';
//could have also written it as follow:
 // let petsPath = path.join(__dirname, 'pets.json');
let express = require('express');
let app = express();
let port = process.env.PORT || 8000;
//writting morgan anf bodyParser as middleware.
let bodyParser = require('body-parser');
let morgan = require('morgan');
app.use(bodyParser.json());
app.use(morgan('combined'));


app.post('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(400);
    }

    let curPetsArr = JSON.parse(petsJSON);
    let age = parseInt(req.body.age);
    let kind = req.body.kind;
    let name = req.body.name;
    let givenPet = {'age': age, 'kind':kind, 'name': name};


    if(!age || !kind || !name) {
      console.error("Need more information");
      return res.sendStatus(400);
    }
    curPetsArr.push(givenPet);
    let newPetsJSON = JSON.stringify(curPetsArr);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
        }
        res.set('Content-Type', 'application/json');
        res.send(givenPet);
      });
  });
});

app.get('/pets/:id',  function(req, res){
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON){
    if (readErr) {
    			console.error(readErr.stack);
    			return res.sendStatus(500);
    }
    let curPetsArr = JSON.parse(petsJSON);
    let id = parseInt(req.params.id);
    let reqPet = curPetsArr[id];
    let petString = JSON.stringify(reqPet);

    if(!reqPet){
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    } else if( id < 0 || id >= curPetsArr.length || isNaN(id)) {

      res.set('Content-Type', 'text/plain');
      res.send(404);
    } else {
      res.set('Content-Type', 'application/json');
      res.send(petString);
    }
  });
});
// patch is alloweing us to update the name of the pet at given id.
app.patch('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON){
    if(readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }
    let id = parseInt(req.params.id);
		let curPetsArr = JSON.parse(petsJSON);
		let reqPet = curPetsArr[id];
		let age = parseInt(req.body.age);
		let kind = req.body.kind;
		let name = req.body.name;

		if (kind){
			reqPet.kind = kind;
		}
		if (age){
			reqPet.age = age;
		}
		if (name){
			reqPet.name = name
		}
    let petsString = JSON.stringify(curPetsArr);
    fs.writeFile(petsPath, petsString, function(writeErr) {
      if(writeErr){
        throw writeErr;
      }
      res.set('Content-Type', 'application/json');
      res.send(reqPet);
    });
  })
})

app.delete('/pets/:id', function(req, res) {
	fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
		if (readErr) {
			console.log(readErr.stack);
			return res.sendStatus(500);
		}
		let id = parseInt(req.params.id);
		let curPetsArr = JSON.parse(petsJSON);
		console.log(curPersArr)
		let reqPet = curPersArr[id];
		curPersArr.splice(id, 1);

		let petsString = JSON.stringify(curPersArr);

		fs.writeFile(petsPath, petsString, function(writeErr) {
			if(writeErr){
				throw writeErr;
			}
			res.set('Content-Type', 'application/json');
			res.send(reqPet);
		});
	})
})

app.use(function(req, res, next) {
	res.sendStatus(404);
})

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('There was a problem with your request')
})

app.listen(port, function(){
	console.log('Listening on port', port);
})

module.exports = app;
