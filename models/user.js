const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  raisonSociale: String,
  contact: String,
  mail : String, 
  password: String,
  portable : String,
  siret : Number, //uniquement sociétés
  adresse : [{rue : String, codePostal: Number, ville: String}]
});

const User = mongoose.model('Assos', AssosSchema);

module.exports = User;