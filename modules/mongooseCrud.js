'use strict';
const mongoose = require('mongoose')
 , Promise = require('bluebird')
 , auth = require('../auth.json');

const connectionstring = auth.mongo;
const Schema = mongoose.Schema;

const profileSchema = Schema({
  name: String,
  phonenumber: String,
  zip: Number,
  xCoord: Number,
  yCoord: Number,
  Checklist1: Number,
  Checklist2: Number,
  Checklist3: Number,
  Checklist4: Number,
  Checklist5: Number,
  Checklist6: Number,
  Checklist7: Number,
  Checklist8: Number,
  Checklist9: Number,
  Checklist10: Number,
  Checklist11: Number,
  Checklist12: Number,
  Checklist13: Number,
  Checklist14: Number,
  Checklist15: Number,
  Checklist16: Number,
  Checklist17: Number,
  Checklist18: Number,
  Checklist19: Number,
  Checklist20: Number
});
const Profile = mongoose.model('Profile', profileSchema);

exports.createProfile = function(profiledata){
  return new Promise(function(resolve, reject) {
    if(profiledata === undefined)
      profiledata = {
        name: "String",
        phonenumber: "String",
        zip: 0,
        xCoord: 0,
        yCoord: 0,
        Checklist1: 0,
        Checklist2: 0,
        Checklist3: 0,
        Checklist4: 0,
        Checklist5: 0,
        Checklist6: 0,
        Checklist7: 0,
        Checklist8: 0,
        Checklist9: 0,
        Checklist10: 0,
        Checklist11: 0,
        Checklist12: 0,
        Checklist13: 0,
        Checklist14: 0,
        Checklist15: 0,
        Checklist16: 0,
        Checklist17: 0,
        Checklist18: 0,
        Checklist19: 0,
        Checklist20: 0,
      };
    let profile = new Profile(profiledata);
    mongoose.connect(connectionstring, function(err, db) {
      // if we failed to connect, abort
      if (err) reject(err);
        profile.save(err => {
          if (err) reject(console.log("error:", err));
            resolve(profile);
        });
      });
    });
}

exports.findProfileName = function(profilename){
  return new Promise(function(resolve, reject) {
  if(profilename === undefined)
    reject("no name");
  
    mongoose.connect(connectionstring, function(err, db) {
    // if we failed to connect, abort
      if (err) reject(err);
      
      Profile.findOne({name: profilename}, (err, myProfile) => {  
          if (err) reject(console.log("error", err));
          resolve(myProfile);
      });

    });
  });
}

exports.findProfileId = function(profileid){
  return new Promise(function(resolve, reject) {
  if(profileid === undefined)
    reject("no name");
  
    mongoose.connect(connectionstring, function(err, db) {
    // if we failed to connect, abort
      if (err) reject(err);
      
      Profile.findOne({_id: profileid}, (err, myProfile) => {  
          if (err) reject(console.log("error", err));
          resolve(myProfile);
      });

    });
  });
}

exports.findAllProfile = function(){
  return new Promise(function(resolve, reject) {

    mongoose.connect(connectionstring, function(err, db) {
    // if we failed to connect, abort
      if (err) throw err;
      
      Profile.find((err, myProfile) => {  
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