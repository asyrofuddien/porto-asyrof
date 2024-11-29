const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  playlist_name: {
    type: String,
  },
  song_ids: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Song',
    },
  ],
});
const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
