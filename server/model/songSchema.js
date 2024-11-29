const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  artist: {
    type: String,
  },
  year: {
    type: Number,
  },
  duration: {
    type: String,
  },
  genre: {
    type: String,
  },
  playlist_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Playlist',
    default: null,
  },
  is_already_played: {
    type: Boolean,
    default: false,
  },
  last_played: {
    type: String,
  },
});
const Song = mongoose.model('Song', songSchema);
module.exports = Song;
