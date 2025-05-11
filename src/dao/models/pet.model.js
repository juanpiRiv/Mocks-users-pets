const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
