const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  party: { type: String, required: true, unique: true },
  total_seat: { type: Number, default: 0 },
  total_votes: { type: Number, default: 0 },
  electors: { type: Number, default: 0 },
  color_code: { type: String, required: true },
  party_logo: { type: String },
  votes_percentage: { type: Number, default: 0 }
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
