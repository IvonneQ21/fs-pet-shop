 'use strict';
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
//dirname gives you the current directory name.
const node = path.basename(process.argv[0]);
const file= path.basename(process.argv[1]);
const cmd = process.argv[2];



// writting the read subcommand.
// if(cmd === 'read') {
//   let petIndex = process.argv[3];
//
//  fs.readFile(petsPath, 'utf8', function(err, data) {
//   let curPets = JSON.parse(data);
//   //NOTE: this converts the data to an object. parse de-stringifies the JSON to be a vanilla obj.
//   //  console.log(curPets);
//    if (err) {
//      throw err;
//    } else if (petIndex) {
//    console.log(curPets[petIndex]);
//     } else {
//       console.log(curPets);
//     }
//  });
// } else {
//    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
//    process.exit(1);
// }

if(cmd === 'read') {
  let petIndex = process.argv[3];

 fs.readFile(petsPath, 'utf8', function(err, data) {
  let curPets = JSON.parse(data);
   if (err) {
     throw err;
   } else if (petIndex) {
   console.log(curPets[petIndex]);
    } else {
      console.log(curPets);
    }
  });
} else if (cmd === 'create') {
  let age = parseInt(process.argv[3]);
  let kind = process.argv[4];
  let name = process.argv[5];
  // let newPet = {age, kind, name};
  // let newPet = {petAge, petKind, petName};
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    // let curPets = JSON.parse(data);
    if(readErr) {
      throw readErr;
    }
      let curPets = JSON.parse(data);
    if(age && kind && name) {
      let newPet = {age, kind, name};
      curPets.push(newPet);
      let petsJSON = JSON.stringify(curPets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
            if(writeErr) {
              throw writeErr;
            }
            console.log(newPet);
          });
    } else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
    // now adding a an instance of a pet to the curent pets array.
      // curPets.push(newPet);
    //converting the array of objects back into an JSON
    // let petsJSON = JSON.stringify(curPets);


  //using fs.writeFile to write data to a file and replacing it since part of it
  //already exists.
  // NOTE: the data that we are passing as 2nd param to the writeFile function in this case is the
  // petsJSON so that the prev petsJSON is replace.

    // fs.writeFile(petsPath, petsJSON, function(writeErr) {
    //       if(writeErr) {
    //         throw writeErr;
    //       }
    //       console.log(newPet);
    //     });
  });
// }
//trying to do update and destroy
 // else if( cmd === 'update'){
 //    let upIndex = process.argv[3];
 //    let upAge = parseInt(process.argv[4]);
 //    let upKind = process.argv[5];
 //    let upName = process.arg[6];
 //
 //    if( upIndex && upAge && upKind && upName ){
 //      let updatePet = {}
 //    } else {
 //
 //      console.log(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
 //    }

  //  fs.readFile(petsPath, 'utf8', function(readErr, data){
  //    if(readErr){
  //      throw readErr;
  //    }
  //    console.log("you are in the update part");
  //    let curPets = JSON.parse(data);
  //  })

 }
 else {
   console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
   process.exit(1);
}
