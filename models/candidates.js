const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number, default: null },
	gender: { type: String, default: null },
	party: { type: mongoose.Schema.Types.ObjectId, ref: "Party", required: true }, // Reference to Party model
	hotCandidate: { type: Boolean, default: false },
	image: { type: String },
	constituency: [{ type: mongoose.Schema.Types.ObjectId, ref: "Constituency" }], // Reference to Constituency model
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
