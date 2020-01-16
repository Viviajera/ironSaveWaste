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
  doneur: [{ type: Schema.Types.ObjectId, ref: "restaurant" }],
  datePeremtion: Date,
  donStatus: {
    type: String,
    enum: ["pending", "booked", "pickedUp"],
    default: "pending"
  },
  preneur: [{ type: Schema.Types.ObjectId, ref: "association" }]
});

const Don = mongoose.model("Don", donSchema);

module.exports = Don;
