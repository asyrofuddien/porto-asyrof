const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/SongPlaylist';

const conn = () => {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('Connected to MongoDB on', dbUrl);
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
  // mongoose.set('debug', true);
};

module.exports = conn;
