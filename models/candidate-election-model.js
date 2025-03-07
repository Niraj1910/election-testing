const mongoose = require("mongoose");
// Election Candidate Schema with Index
const ElectionCandidateSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },

  votesReceived: { type: Number, default: 0 },
  // status: { type: String, enum: ['winner', 'lost', 'pending'], default: 'pending' }
});

const model = mongoose.model("ElectionCandidate", ElectionCandidateSchema);
module.exports = model;
