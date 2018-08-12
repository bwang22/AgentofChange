var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");

router.get("/AOC/getProfile/:username", async function(req, res) {
    var response = {}, code, username = req.params.username;
    try {
        var profile = await profileService.getProfile(username);
        if (!profile)
            throw "Profile with such a username does not exist.";
        
        profile.coords = profile.coords.coordinates;
        response.status = "OK";
        response.profile = profile;
        code = 200;
    } catch (err) {
        logger.error(err, { note: "Error occurred while getting profile", data: username });
        response.status = "error";
        response.message = err;
        code = 400;
    }
    res.status(code).send(response);
});

module.exports = router;