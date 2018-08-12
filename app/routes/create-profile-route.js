var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");

router.use(bodyParser.json());

router.post('/AOC/createProfile', async function(req, res) {
    var profile = req.body, response = {}, code;
    try {       
        profile.coords = { type: "Point", coordinates: profile.coords };
        // Insert the profile into the database
        var newProfile = await profileService.insertProfile(profile);
        response.status = "OK";
        response.message = "Profile successfully inserted into database.";
        response.id = newProfile._id;
        code = 201;
    } catch (err) {
        logger.error(err, { note: "Error occurred while creating profile" });
        response.status = "error";
        response.message = err;
        code = 400;
    }
    res.status(code).send(response);
});

module.exports = router;
