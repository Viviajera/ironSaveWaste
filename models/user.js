const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  raisonSociale: String,
  clientType: { type: String, enum: ["association", "restaurant"] },
  contact: String,
  username: String,
  password: String,
  portable: Number,
  siret: Number, //uniquement sociétés
  adresse: {
    street: String,
    zipCode: Number,
    city: String
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
