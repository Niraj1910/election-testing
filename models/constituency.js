const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    totalVotes: { type: Number, required: true },
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
    won: {
        type: String,
        enum: ['won', 'loss', 'awaiting'],
        default: 'awaiting'
    },
});

const Constituency = mongoose.model('Constituency', constituencySchema);

module.exports = Constituency;