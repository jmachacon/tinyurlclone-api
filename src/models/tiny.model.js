const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TinySchema = new Schema({
    url: {
        required: true,
        type: String
    },
    hash: String,
    hostname: String,
    create_dt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tiny', TinySchema);