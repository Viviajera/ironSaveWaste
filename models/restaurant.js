const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const RestaurantSchema = Schema({
  restaurantNom: String,
  propietaireNom: String,
  mail : String, 
  motdePasse: String,
  portable : String,
  siret : Number, // limiter à 14 chiffres
  adresse : [{rue : String, codePostal: Number, ville: String}]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;