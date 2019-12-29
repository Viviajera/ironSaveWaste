const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AssosSchema = Schema({
  assosNom: String,
  contactassosNom: String,
  mail : String, 
  motdePasse: String,
  portable : String,
  adresse : [{rue : String, codePostal: Number, ville: String}]
});

const Assos = mongoose.model('Assos', AssosSchema);

module.exports = Assos;