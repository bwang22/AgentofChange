var GeoJSON = require('mongoose-geojson-schema');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoose = require("mongoose");

const SupplySchema = mongoose.Schema({
    name: {type: String, required: true},
    qty: {type: Number, required: true},
    units: {type: String, required: true},
    need: {type: Boolean, required: true}
}, {_id: false});

const ProfileSchema = mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    zipCode: {type: String, required: true},
    coords: {type: mongoose.Schema.Types.Point, required: true, index: "2dsphere"},
    supplies: [SupplySchema],
    householdSize: Number,
    womenPresent: Boolean,
    childrenPresent: Boolean,
    disabledPresent: Boolean,
    seniorsPresent: Boolean
});

ProfileSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("Profile", ProfileSchema);