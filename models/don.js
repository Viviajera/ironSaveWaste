const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donSchema = Schema({
  donNom: String,
  donType: {
    type: String,
    enum: ["légumes", "fruits", "viande", "divers"],
    default: "divers"
  },
  donPoids: Number,
  donneur: { type: Schema.Types.ObjectId, ref: "User" },
  datePeremption: Date,
  donStatus: {
    type: String,
    enum: ["pending", "booked", "pickedUp"],
    default: "pending"
  },
  preneur: { type: Schema.Types.ObjectId, ref: "User" },
  donGeoloc: {
    lat: Number,
    lng: Number
  }
});

const Don = mongoose.model("Don", donSchema);

module.exports = Don;
