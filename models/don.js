const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DonSchema = Schema({
  donNom: String,
  donType: String,
  donPoids : String, 
  doneur : [{type : Schema.Types.ObjectId, ref: 'Restaurant'}],
  datePeremtion : Date,
  donStatus:Array,//Pending,booked, picked up
  preneur : [{type : Schema.Types.ObjectId, ref: 'Assos'}],
});

const Assos = mongoose.model('Assos', AssosSchema);

module.exports = Assos;