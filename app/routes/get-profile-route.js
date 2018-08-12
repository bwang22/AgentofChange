var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");

router.get("/AOC/getProfile/:id", async function(req, res) {
    var response = {}, code, id = req.params.id;
    try {
        var profile = await profileService.getProfile(id);
        if (!profile)
            throw "Profile with such an ID does not exist.";
        
        profile.coords = profile.coords.coordinates;
        response.status = "OK";
        response.profile = profile;
        code = 200;
    } catch (err) {
        logger.error(err, { note: "Error occurred while getting profile", data: id });
        response.status = "error";
        response.message = err;
        code = 400;
    }
    res.status(code).send(response);
});

module.exports = router;