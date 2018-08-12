var express = require('express');
var router = express.Router();
var profileService = require('../mongoose/services/profileService.js');
const logger = require("../logger.js");

router.get("/AOC/:username/find", async function(req, res) {
    var userQuery = req.query;
    
    var query = {};
    var radius = parseInt(userQuery.r);
    // by default the radius is 10 miles
    radius = (isNaN(radius) || radius < 0) ? 10 : radius;
    
    // check for these boolean fields
    ["womenPresent", "childrenPresent", "disabledPresent", "seniorsPresent"].forEach(i => { 
        if (userQuery[i] === "t")
            query[i] = true;
    });
    
    // if user is an admin then he can choose what to sort by
    var userSort = (["activeDate", "lastUpdated", "numSold", "startDate"].includes(userQuery.sort) && (ret.type === Role.admin || ret.type === Role.manager))
        ? userQuery.sort : null;
    // and if user is a manager then he can only sort by activeDate and lastUpdated
    if (ret.type === Role.manager && ["numSold", "startDate"].includes(userSort))
        userSort = null;
    
    if (userSort === "startDate")
        userSort = "ebayDetails." + userSort;
    
    if (userSort)
        sort[userSort] = -1;
    // if no sort was specified then use the default
    else {
        // if there is a query then sort by numSold in descending order unless it's a title search then sort by how much it matches as well
        if (q.length > 0) {
            if (search === "title") {
                sort.score = { $meta: "textScore" };
                select.score = { $meta: "textScore" };
            }
            
            sort.numSold = -1;
        }
        // if there is no query then sort by activeDate in descending order
        else
            sort.activeDate = -1;
    }
    
    // admin might want more info to be displayed on the table for easy viewing
    if (ret.type === Role.admin)
        ["ebayDetails.status", "ebayDetails.startDate", "lastUpdated", "numSold"].forEach(i => { select[i] = 1; });
    else if (ret.type === Role.manager)
        select.lastUpdated = 1;
    
    // determines if user was specified or not
    var user = (userQuery.user === "all") ? null : userQuery.user;
    if (user) {
        // if you're an admin or manager you can search by any username
        if (ret.type === Role.admin || ret.type === Role.manager)
            query.activeUsername = user;
        // you're not an admin or manager then you can only search by your own username
        else if (user === ret.username)
            query.activeUsername = user;
    }   
    
    // t - items that are on eBay, f - items that aren't on eBay
    var ebayStatus = (["t", "f"].includes(userQuery.estatus) && ret.type === Role.admin) ? userQuery.estatus : null;
    if (ebayStatus)
        query["ebayDetails.status"] = (ebayStatus === "t");
    
    // in (in-stock) - items that have availableQty > 0, out (out-of-stock) - items with availableQty === 0
    var activeStatus = (["in", "out"].includes(userQuery.astatus)) ? userQuery.astatus : null;
    if (activeStatus) {
        if (activeStatus === "in")
            query.availableQty = { $gt: 0 };
        else
            query.availableQty = 0;
    }
    
    // t - items that have anything in the opQueue
    var queued = (userQuery.queued === "t" && ret.type === Role.admin) ? userQuery.queued : null;
    if (queued === "t")
        query["ebayDetails.opQueue.0"] = { $exists: true };
    
    // t - items that are flagged, f - items that aren't flagged
    var flagged = (["t", "f"].includes(userQuery.flag)) ? userQuery.flag : null;
    if (flagged)
        query.flag = { $exists: (flagged === "t") };
    
    var dateSearch = (["activeDate", "lastUpdated", "startDate"].includes(userQuery.dsearch) && (ret.type === Role.admin || ret.type === Role.manager))
        ? userQuery.dsearch : "activeDate";
    if (dateSearch === "startDate") {
        // manager cannot do a search on eBay start date
        if (ret.type === Role.manager)
            dateSearch = "activeDate";
        else
            dateSearch = "ebayDetails." + dateSearch;
    }
    
    var date = (["tday", "lday", "tweek", "lweek", "tmonth", "lmonth", "custom"].includes(userQuery.date)) ? userQuery.date : null;
    if (date) {
        let time, period;
        // must be an admin or manager to search by custom date
        if (date === "custom" && (ret.type === Role.admin || ret.type === Role.manager)) {
            time = moment.tz(userQuery.day, TZ);
            // if the date is invalid then default the time to today
            if (!(time.isValid()))
                time = moment.tz(new Date(), TZ);
            
            period = "day";
        } else {
            // current time in the specified timezone (TZ)
            time = moment.tz(new Date(), TZ);
            let option = date.charAt(0);
            period = date.substring(1);

            if (option === "l")
                time.subtract(1, period + "s");
        }
        
        query[dateSearch] = { $gte: time.startOf(period).toDate(), $lt: time.endOf(period).toDate() };
    }
    
    var page = parseInt(userQuery.page);
    page = (isNaN(page) || page < 1) ? 1 : page;
    
    var limit = parseInt(userQuery.limit);
    limit = (isNaN(limit) || limit < 1) ? 50 : limit;
    
    var response, code;
    try {
        response = await itemService.search(query, select, sort, page, limit);
        code = 200;
    } catch (err) {
        logger.error(err, { note: "Error occurred while searching for items" });
        response = {
            status: "error",
            message: err
        };
        code = 500;
    }
    
    res.status(code).send(response);
});

module.exports = router;
