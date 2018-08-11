'use strict';
const mongoose = require('mongoose')
 , Promise = require('bluebird')
 , auth = require('../auth.json');

const connectionstring = auth.mongo;
const Schema = mongoose.Schema;

const profileSchema = Schema({
  name: String,
  phonenumber: String,
  xCoord: Number,
  yCoord: Number,
  Checklist1: Number,
  Checklist2: Number,
  Checklist3: Number,
  Checklist4: Number,
  Checklist5: Number,
  Checklist6: Number,
  Checklist7: Number,
  Checklist8: Number
});
const Profile = mongoose.model('Profile', profileSchema);

// mongoose.connect(connectionstring, function(err, db) {
//   // if we failed to connect, abort
//   if (err) throw err;

//   createProfile();
//   // // we connected ok
//   // let oldcoord = {};
//   // Coord.findOne({id: "0"}, (err, mycoord) => {  
//   //     // Note that this error doesn't mean nothing was found,
//   //     // it means the database had an error while searching, hence the 500 status
//   //     if (err) console.log(err)
//   //     // send the list of all people
//   //     if(mycoord === undefined || mycoord === null){
//   //       Coord.create({
//   //         id: '0',
//   //         coord: '{"x": 0, "y": 0}'
//   //       }, function (err) {
//   //         if (err) return console.log(err);
//   //         // saved!
//   //         oldcoord = {x: 0, y: 0};
//   //         drawmaze(oldcoord);
//   //       }); 
//   //     }
//   //     else{
//   //       oldcoord = JSON.parse(mycoord.coord);
//   //       console.log(oldcoord)
//   //       drawmaze(oldcoord);
//   //     }

//   // });
      
// });

exports.createProfile = function(profiledata){
  if(profiledata === undefined)
    profiledata = {
      name: "String",
      phonenumber: "String",
      xCoord: 0,
      yCoord: 0,
      Checklist1: 0,
      Checklist2: 0,
      Checklist3: 0,
      Checklist4: 0,
      Checklist5: 0,
      Checklist6: 0,
      Checklist7: 0,
      Checklist8: 0
    };
  let profile = new Profile(profiledata);

  mongoose.connect(connectionstring, function(err, db) {
    // if we failed to connect, abort
    if (err) throw err;
    return new Promise(function(resolve, reject) {
      profile.save(err => {
        if (err) reject(console.log("error:", err));
          resolve(profile);
      });
    });

  });
}

exports.findProfile = function(profilename){
  return new Promise(function(resolve, reject) {
  if(profilename === undefined)
    reject("no name");
  
    mongoose.connect(connectionstring, function(err, db) {
    // if we failed to connect, abort
      if (err) throw err;
      
      Profile.findOne({name: profilename}, (err, myProfile) => {  
          if (err) reject(console.log("error", err));
          resolve(myProfile);
      });

    });
  });
}

exports.updateProfile = function(id, profiledata){
  return new Promise(function(resolve, reject) {
    if(id === undefined || profiledata === undefined)
    reject("no id or profile");

    mongoose.connect(connectionstring, function(err, db) {
      // if we failed to connect, abort
      if (err) throw err;
      
        Profile.findByIdAndUpdate(id, profiledata, {new: true},
          (err, profile) => {
          // Handle any possible database errors
              if (err) reject(console.log("error", err));
              resolve(profile);
        });
    });
  });
}


exports.deleteProfile = function(id){

  return new Promise(function(resolve, reject) {
  if(id === undefined)
    reject("no id")
  mongoose.connect(connectionstring, function(err, db) {
    if (err) throw err;
    Profile.findByIdAndRemove(id, (err, profile) => {
      if (err) reject(err);
      resolve(console.log("Profile successfully deleted id:" + id));
    });
  });

  });
}