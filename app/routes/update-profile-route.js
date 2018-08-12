var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");
var Profile = require('../mongoose/models/Profile.js');

router.use(bodyParser.json());

router.post("/AOC/updateProfile/:id", async function(req, res) {
    var coords = null;
    if (req.body)
        coords = req.body.coords;
    
    // only include fields in the update object that are actually apart of the Profile object so that everything shouldn't be sent to the database
    var response = {}, code, newProfile = (new Profile(req.body)).toObject(), id = req.params.id;
    try {
        // deletes the things that should not be updated
        ["_id", "username", "__v"].forEach(i => delete newProfile[i]);
        if (coords)
            newProfile.coords = { type: "Point", coordinates: coords };
        
        var count = (await profileService.updateProfile(id, newProfile)).modifiedCount;
        if (count === 0)
            throw "Unable to update profile.";
        
        response.status = "OK";
        response.message = "Profile successfully updated.";
        code = 202;
    } catch (err) {
        logger.error(err, { note: "Error occurred while updating profile", data: id });
        response.status = "error";
        response.message = err;
        code = 400;
    }
    res.status(code).send(response);
});

module.exports = router;