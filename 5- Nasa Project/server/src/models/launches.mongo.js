const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
    // min: 100,
    // max: 16384
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  destination: {
    // type: mongoose.ObjectId,   //Relacion
    // ref: "Planet",
    type: String,
    required: false,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//Connects launchesSchema with the "launches" collection
// mongo collections necestian estan en plural
module.exports = mongoose.model("Launch", launchesSchema);
