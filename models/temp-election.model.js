const mongoose = require("mongoose");

const ElectionInfoSchema = new mongoose.Schema({
	partyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Party" }],
	candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
});

const TempElectionSchema = new mongoose.Schema(
	{
		state: {
			type: String,
			required: [true, "State name is required"],
			trim: true,
		},
		electionSlug: {
			type: String,
			required: [true, "State slug is required"],
		},
		totalSeats: {
			type: Number,
			required: [true, "Total seats count is required"],
			min: [1, "There should be at least 1 seat"],
		},
		year: {
			type: Number,
			required: [true, "Year is required"],
		},
		halfWayMark: {
			type: Number,
			required: [true, "Halfway mark is required"],
			min: [0, "Halfway mark cannot be negative"],
		},
		electionInfo: {
			type: ElectionInfoSchema,
			required: true,
		},
	},
	{ timestamps: true },
);

const TempElection = mongoose.model("TempElection", TempElectionSchema);
module.exports = TempElection;
