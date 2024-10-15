const mongoose = require('mongoose');

// Party Schema
const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Party name is required'],
    trim: true
  },
  won: {
    type: Number,
    required: [true, 'Number of seats won is required'],
    min: [0, 'Seats won cannot be negative'],
    default: 0
  },
  leading: {
    type: Number,
    min: [0, 'Seats leading cannot be negative'],
    default: 0
  },
  partyColor: {
    type: String,
  }
}, { _id: false });  // No need for an extra _id for each party

// Election Schema
const electionSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, 'State name is required'],
    trim: true
  },
  stateSlug: {
    type: String,
    required: [true, 'State slug is required'],
    trim: true
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats count is required'],
    min: [1, 'There should be at least 1 seat']
  },
  declaredSeats: {
    type: Number,
    required: [true, 'Declared seats count is required'],
    min: [0, 'Declared seats cannot be negative']
  },
  halfWayMark: {
    type: Number,
    required: [true, 'Halfway mark is required'],
    min: [0, 'Halfway mark cannot be negative']
  },
  parties: {
    type: [partySchema], // Array of party data using the sub-schema
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one party must be provided'
    }
  }
}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt` fields

// Virtual to calculate the total seats won
electionSchema.virtual('totalWonSeats').get(function() {
  return this.parties.reduce((acc, party) => acc + party.won, 0);
});

// Method to find the leading party
electionSchema.methods.findLeadingParty = function() {
  return this.parties.reduce((prev, current) => {
    return (prev.won > current.won) ? prev : current;
  });
};

// Static method to find elections by state
electionSchema.statics.findByState = function(state) {
  return this.findOne({ state });
};

// Export the model
const Election = mongoose.model('Election', electionSchema);
module.exports = Election;