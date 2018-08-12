var express = require('express');
var router = express.Router();
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");

router.get("/AOC/:id/find", async function(req, res) {
    var userQuery = req.query;
    
    var query = {};
    var radius = parseInt(userQuery.r);
    // if the radius is negative then it defaults to 10 miles; if no radius is defined then no max distance is specified
    radius = (radius < 0) ? 10 : (isNaN(radius)) ? null : radius;
    
    // check for these boolean fields
    ["womenPresent", "childrenPresent", "disabledPresent", "seniorsPresent"].forEach(i => { 
        if (userQuery[i] === "t")
            query[i] = true;
    });
    
    var householdSize = parseInt(userQuery.size);
    householdSize = (isNaN(householdSize) || householdSize < 1) ? null : householdSize;
    if (householdSize) {
        if (householdSize > 6)
            query.householdSize = { $gt: 6 };
        else
            query.householdSize = householdSize;
    }
    
    if (userQuery.zip)
        query.zipCode = userQuery.zip;
    
    if (userQuery.supplyName && ["t", "f"].includes(userQuery.need))
        query.supplies = { $elemMatch: { name: userQuery.supplyName, need: (userQuery.need === "t") } };
    
    var page = parseInt(userQuery.page);
    page = (isNaN(page) || page < 1) ? 1 : page;
    
    var limit = parseInt(userQuery.limit);
    limit = (isNaN(limit) || limit < 1) ? 50 : limit;
    
    var response, code;
    try {
        var center = (await profileService.getLoc(req.params.id)).coords;
        // distanceField is in meters so have to convert it to miles with distanceMultiplier
        var geoSearch = { spherical: true, near: center, distanceField: "dist", distanceMultiplier: 0.000621371 };
        // maxDistance is in meters so we must convert the miles -> meters, but
        if (radius)
            geoSearch.maxDistance = radius * 1609.34;
        if (!(isEmpty(query)))
            geoSearch.query = query;

        pipeline = [{ $geoNear: geoSearch }, { $sort: { dist: 1 } }];
        
        response = await profileService.find(pipeline, page, limit);
        renameKeys(response, { pageCount: "pages", totalCount: "total" });
        response.page = page;
        response.limit = limit;
        code = 200;
    } catch (err) {
        logger.error(err, { note: "Error occurred while finding profiles" });
        response = {
            status: "error",
            message: err
        };
        code = 500;
    }
    
    res.status(code).send(response);
});

function isEmpty(obj) {
    return (Object.keys(obj).length === 0);
}

function renameKeys(obj, newKeys) {
    // newKeys is in the form: { oldKey: newKey, ... }
    Object.entries(newKeys).forEach(([key, val]) => {
        obj[val] = obj[key];
        delete obj[key];
    });
}

module.exports = router;
