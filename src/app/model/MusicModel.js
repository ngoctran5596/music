const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Song = new Schema(
    {
        title: { type: String, required: true },
        album: { type: String }, //default: 'Single' },
        // default removes as this would create problem in album art generation/storage
        albumArtist: String,
        year: Number,
        singer: String,
        path: { type: String, required: true },
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model('Tracks', Song);