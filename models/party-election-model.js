const mongoose = require("mongoose");

const ElectionPartyResultSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
  party: { type: mongoose.Schema.Types.ObjectId, ref: "Party", required: true },
  seatsWon: { type: Number, default: 0 },
});

const model = mongoose.model("ElectionPartyResult", ElectionPartyResultSchema);
module.exports = model;
