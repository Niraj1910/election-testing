const mongoose = require("mongoose");

const allianceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true, unique: true },
  leaderParty: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
  parties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Party" }],
});

const AllianceModel = mongoose.model("Alliance", allianceSchema);

module.exports = AllianceModel;
