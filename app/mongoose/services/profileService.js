var Profile = require('../models/Profile.js');
var mongoose = require('mongoose');

async function insertProfile(profile) {
    var profile = new Profile(profile);
    return profile.save();
}

async function getProfile(username) {
    return Profile.findOne({ username: username }, null, { lean: true });
}

async function updateLoc(username, loc) {
    return Profile.updateOne({ username: username }, { $set: { coords: { type: "Point", coordinates: loc } } });
}

async function find(pipeline, page, limit) {
    return Profile.aggregatePaginate(Profile.aggregrate(pipeline), { page: page, limit: limit });
}

async function updateProfile(username, update) {
    return Profile.collection.updateOne({ username: username }, { $set: update });
}

async function deleteProfile(username) {
    return Profile.collection.deleteOne({ username: username });
}

module.exports = { insertProfile, getProfile, updateLoc, find, updateProfile, deleteProfile };
