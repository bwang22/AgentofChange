var Profile = require('../models/Profile.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

async function insertProfile(profile) {
    var profile = new Profile(profile);
    return profile.save();
}

async function getProfile(id) {
    return Profile.findById(id, null, { lean: true });
}

async function getLoc(id) {
    return Profile.findById(id, { _id: 0, coords: 1 }, { lean: true });
}

async function updateLoc(id, loc) {
    return Profile.updateOne({ _id: id }, { $set: { coords: { type: "Point", coordinates: loc } } });
}

async function find(pipeline, page, limit) {
    return Profile.aggregatePaginate(Profile.aggregate(pipeline), { page: page, limit: limit });
}

async function updateProfile(id, update) {
    id = new ObjectId(id);
    return Profile.collection.updateOne({ _id: id }, { $set: update });
}

async function deleteProfile(id) {
    id = new ObjectId(id);
    return Profile.collection.deleteOne({ _id: id });
}

module.exports = { insertProfile, getProfile, getLoc, updateLoc, find, updateProfile, deleteProfile };
