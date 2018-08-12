var express = require('express');
var router = express.Router();
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");

router.delete("/AOC/deleteProfile/:username", async function(req, res) {
    var username = req.params.username, response = {}, code; 
    try {
        var count = (await profileService.deleteProfile(username)).deletedCount;
        if (count === 0)
            throw "Unable to delete profile.";

        response.status = "OK";
        response.message = "Profile successfully deleted from database.";
        code = 200;        
    } catch (err) {
        logger.error(err, { note: "Error occurred while deleting profile", data: username });
        response.status = "error";
        response.message = err;
        code = 400;
    }
    res.status(code).send(response);
});

module.exports = router;
