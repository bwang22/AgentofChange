var express = require('express');
var router = express.Router();
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");

router.delete("/AOC/deleteProfile/:id", async function(req, res) {
    var id = req.params.id, response = {}, code; 
    try {
        var count = (await profileService.deleteProfile(id)).deletedCount;
        if (count === 0)
            throw "Unable to delete profile.";

        response.status = "OK";
        response.message = "Profile successfully deleted from database.";
        code = 200;        
    } catch (err) {
        logger.error(err, { note: "Error occurred while deleting profile", data: id });
        response.status = "error";
        response.message = err;
        code = 400;
    }
    res.status(code).send(response);
});

module.exports = router;
