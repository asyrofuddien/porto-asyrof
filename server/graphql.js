const { gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const Song = require('./model/songSchema');
const Playlist = require('./model/playlistSchema');
const User = require('./model/userSchema');
const bcrypt = require('bcrypt');
const moment = require('moment');
const fetch = require('node-fetch');
const util = require('util');
const { calculateDurationInSeconds, formatDuration } = require('./controller/calculateDuration');
const { PlaySong } = require('./controller/cronJobSong');
const typeDefs = gql`
  type Song {
    _id: ID!
    title: String
    artist: String
    year: Int
    duration: String
    genre: String
    album: String
    playlist_id: Playlist
    total_data: Int
  }
  type Playlist {
    _id: ID
    playlist_name: String
    song_ids: [Song]
    duration_playlist: String
    start_time: String
    end_time: String
  }
  type detelePlaylist {
    message: String
  }
  type Registration {
    username: String
    first_name: String
    last_name: String
    password: String
  }
  type Users {
    _id: ID
    username: String
    first_name: String
    last_name: String
  }
  type Login {
    userId: ID
    msg: String
    token: String
  }
  type TriggeredCornSong {
    playing: String
    artist: String
    duration: String
  }
  type PlaylistArtist {
    artist: String
    songs: [Song]
    duration_playlist: String
    start_time: String
    end_time: String
  }
  type PlaylistGenre {
    genre: String
    songs: [Song]
    duration_playlist: String
    start_time: String
    end_time: String
  }

  type WebhookResponse {
    msg: String
    playlist_name: [String]
    creator: [String]
    total_playlist: Int
    total_songs: Int
  }

  type Webhook {
    msg: String
    playlist_name: String
    description: String
    song_list: [Song]
    creator: String
    total_favorite: String
  }
  input RegistrationInput {
    username: String!
    first_name: String!
    last_name: String!
    password: String!
  }
  input SongInput {
    title: String
    artist: String
    year: Int
    duration: String
    genre: String
    album: String
  }
  input SongUpdate {
    title: String
    artist: String
    year: Int
    duration: String
    genre: String
  }

  input PlaylistInput {
    playlist_name: String
    description: String
    song_list: [SongInput]
    creator: String
    total_favorite: String
  }

  type Query {
    GetAllUsers: [Users]
    GetAllSong(page: Int!, data_per_page: Int!): [Song]
    GetSongById(_id: ID!): Song
    GetAllPlaylist: [Playlist]
    GetRandomPlaylistSong: Playlist
    GetAllPlaylistWithDuration: [Playlist]
    GetOnePlaylistWithDurationById(_id: ID!): Playlist
    GetPlaylistBasedArtist: [PlaylistArtist]
    GetPlaylistBasedGenre: [PlaylistGenre]
    GetPlaylistById(_id: ID!): Playlist
  }

  type Mutation {
    Registration(input: RegistrationInput): Registration
    Login(username: String, password: String): Login
    CreateSong(input: [SongInput]): [Song]
    UpdateSong(_id: ID!, input: SongUpdate): Song
    DeleteSong(_id: ID!): Song
    CreatePlaylist(name: String): Playlist
    CreatePlaylistGenre(genre: String): Playlist
    CreatePlaylistArtist(artist: String): Playlist
    CreatePlaylistLessOneHour: Playlist
    UpdatePlaylistAddSong(playlist_name: String!, songId: ID!): Playlist
    UpdatePlaylistRmvSong(playlist_name: String!, songId: ID!): Playlist
    DeletePlaylist(genre: String!): detelePlaylist
    Webhook(input: [PlaylistInput]): [Webhook]
    PlaySong: String
  }
`;

const resolvers = {
  Query: {
    GetAllUsers: async (_, args, context) => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetAllSong: async (_, { page, data_per_page }, context) => {
      try {
        // return await Song.find();

        // console.log(data_per_page);

        const Songs = await Song.aggregate([
          {
            $facet: {
              totalData: [
                {
                  $group: {
                    _id: null,
                    count: { $sum: 1 },
                  },
                },
              ],
              metadata: [{ $sort: { title: 1 } }, { $skip: page * data_per_page }, { $limit: data_per_page }],
            },
          },
        ]);

        // console.log(Songs);
        // const totalData = Songs[0].totalData[0].count;
        const song = Songs[0].metadata;
        // console.log(page);
        // console.log(Songs[0].metadata);

        // console.log(song);
        const pagination = song.map((a) => {
          return {
            ...a,
            totalData: Songs[0].totalData[0].count,
          };
        });
        // console.log(pagination);
        return pagination;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    GetSongById: async (_, { _id }, context) => {
      try {
        return await Song.findById(_id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetAllPlaylist: async (_, args, context) => {
      try {
        verifyJWT(context);
        return await Playlist.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetAllPlaylistWithDuration: async (_, args, context) => {
      try {
        verifyJWT(context);

        //get playlist data
        const playlistData = await Playlist.find().populate('song_ids');

        //sanity
        if (playlistData.length === 0) {
          throw new Error('Playlist Not found');
        }

        //result declare
        const result = [];

        //for playlist
        for (let i = 0; i < playlistData.length; i++) {
          let songIds = []; //reset playlist song each playlist
          let totalDurationSecond;
          let total = 0;
          //for songs
          for (let j = 0; j < playlistData[i].song_ids.length; j++) {
            const songs = [playlistData[i].song_ids[j]]; //if not array cant user reduce
            //calculate total duration in second
            totalDurationSecond = songs.reduce((_, song) => {
              songIds.push(song._id);

              // call function calculateDurationInSeconds
              total += calculateDurationInSeconds(song.duration);
              // console.log(a);
              return total;
            }, 0);
          }
          // console.log(songIds);
          const duration_playlist = formatDuration(totalDurationSecond);
          const startTime = moment().locale('id').format('LL HH:mm:ss');
          const endTime = moment().add(totalDurationSecond, 'second').locale('id').format('LL HH:mm:ss');
          result.push({
            _id: playlistData[i]._id,
            playlist_name: playlistData[i].playlist_name,
            duration_playlist: duration_playlist,
            start_time: startTime,
            end_time: endTime,
            song_ids: songIds,
          });
        }

        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetOnePlaylistWithDurationById: async (_, { _id }, context) => {
      try {
        verifyJWT(context);
        if (!_id) {
          throw new Error('_id must be filled');
        }
        const playlistData = await Playlist.find({ _id: _id }).populate('song_ids');

        if (playlistData.length === 0) {
          throw new Error('Playlist Not found');
        }
        // const artistPlaylists = [];
        // const result = [];

        for (let i = 0; i < playlistData.length; i++) {
          let songIds = [];
          let totalDurationSecond;
          let a = 0;
          for (let j = 0; j < playlistData[i].song_ids.length; j++) {
            const songs = [playlistData[i].song_ids[j]];

            totalDurationSecond = songs.reduce((_, song) => {
              songIds.push(song._id);

              a += calculateDurationInSeconds(song.duration);
              // console.log(a);
              return a;
            }, 0);
          }
          // console.log(songIds);
          const duration_playlist = formatDuration(totalDurationSecond);
          const startTime = moment().locale('id').format('LL HH:mm:ss');
          const endTime = moment().add(totalDurationSecond, 'second').locale('id').format('LL HH:mm:ss');
          result = {
            playlist_name: playlistData[i].playlist_name,
            duration_playlist: duration_playlist,
            start_time: startTime,
            end_time: endTime,
            song_ids: songIds,
          };
        }

        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetRandomPlaylistSong: async (_, args, context) => {
      try {
        verifyJWT(context);
        const song = await Song.find();

        if (song.length === 0) {
          throw new Error('Song Not found');
        }

        const PlaylistSongs = [];

        // Fungsi untuk mengacak array algoritma Fisher-Yates
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            // console.log(array)
          }
        }
        // const shuffledData = [1,2,3,5,4,6,8,7,4,6,5];
        const shuffledData = [...song];
        shuffleArray(shuffledData);

        let totalDurationInSeconds = 0;

        for (const songs of shuffledData) {
          const songDurationInSeconds = calculateDurationInSeconds(songs.duration); // menyimpan nilai detik dari lagu yang akan di tambah
          if (totalDurationInSeconds + songDurationInSeconds <= 3600) {
            //dicek jika total dutasi sebelumnya + durasi yang akan ditambah akan melebihi 60 menit atau tidak
            PlaylistSongs.push(songs); //jika iya push song lagi
            totalDurationInSeconds += calculateDurationInSeconds(songs.duration); // durasi ditambah
          }
        }

        let totalMinutes = Math.floor(totalDurationInSeconds / 60);
        const totalSeconds = totalDurationInSeconds % 60;
        let totalDuration;
        if (totalSeconds < 10) {
          totalDuration = totalMinutes + ':0' + totalSeconds;
        } else {
          totalDuration = totalMinutes + ':' + totalSeconds;
        }
        let PlaylistSongsIds = [];
        for (const songIds of PlaylistSongs) {
          PlaylistSongsIds.push(songIds._id);
        }
        const durationInSecond = formatDuration(totalDurationInSeconds);

        const startTime = moment().locale('id').format('LL HH:mm:ss');
        const endTime = moment().add(totalDurationInSeconds, 'second').locale('id').format('LL HH:mm:ss');
        return {
          playlist_name: 'Playlist less than 1 hour ( ' + totalDuration + ' )',
          song_ids: PlaylistSongsIds,
          duration_playlist: durationInSecond,
          start_time: startTime,
          end_time: endTime,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetPlaylistBasedArtist: async (_, args, context) => {
      try {
        verifyJWT(context);
        const allSongs = await Song.find();
        if (allSongs.length === 0) {
          throw new Error('Song Not found');
        }
        const songsByArtist = {};
        allSongs.forEach((song) => {
          if (!songsByArtist[song.artist]) {
            songsByArtist[song.artist] = [];
          }
          songsByArtist[song.artist].push(song);
        });

        // Calculate the created datetime and predicted finish datetime for each artist's playlist
        const artistPlaylists = [];
        let totalDurationSecond;
        for (const artist in songsByArtist) {
          const songs = songsByArtist[artist];
          // console.log(songs);
          totalDurationSecond = songs.reduce((total, song) => {
            return total + calculateDurationInSeconds(song.duration);
          }, 0);

          const startTime = moment().locale('id').format('LL HH:mm:ss');
          const endTime = moment().add(totalDurationSecond, 'second').locale('id').format('LL HH:mm:ss');

          artistPlaylists.push({
            artist,
            songs,
            duration_playlist: formatDuration(totalDurationSecond),
            start_time: startTime,
            end_time: endTime,
          });
        }

        return artistPlaylists;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetPlaylistBasedGenre: async (_, args, context) => {
      try {
        verifyJWT(context);
        const allSongs = await Song.find();
        if (allSongs.length === 0) {
          throw new Error('Song Not found');
        }
        const songsByGenre = {};

        allSongs.forEach((song) => {
          if (!songsByGenre[song.genre]) {
            songsByGenre[song.genre] = [];
          }
          songsByGenre[song.genre].push(song);
        });

        // Calculate the created datetime and predicted finish datetime for each artist's playlist
        const artistPlaylists = [];
        let totalDurationSecond;
        for (const genre in songsByGenre) {
          const songs = songsByGenre[genre];
          totalDurationSecond = songs.reduce((total, song) => {
            return total + calculateDurationInSeconds(song.duration);
          }, 0);

          const startTime = moment().locale('id').format('LL HH:mm:ss');
          const endTime = moment().add(totalDurationSecond, 'second').locale('id').format('LL HH:mm:ss');

          artistPlaylists.push({
            genre,
            songs,
            duration_playlist: formatDuration(totalDurationSecond),
            start_time: startTime,
            end_time: endTime,
          });
        }

        return artistPlaylists;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    GetPlaylistById: async (_, { _id }, context) => {
      try {
        verifyJWT(context);
        return await Playlist.findById(_id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    Registration: async (_, { input }, context) => {
      try {
        if (input && input.username && input.password) {
          //putaran
          const saltRounds = 8;
          //encrypt password
          const hashed = await bcrypt.hash(input.password, saltRounds);
          //replace the input passward with hashed password
          input.password = hashed;

          return await User.create(input);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    Login: async (_, user, context) => {
      try {
        if (user && user.username && user.password) {
          //find user data
          const userId = await User.find({ username: user.username });

          let jwtSecretKey = 'plered'; //secretkey

          let token;
          //generate token

          //comparing the hashed paswword with user input
          const result = await bcrypt.compare(user.password, userId[0].password);

          //if match generate token
          if (userId && userId[0].username === user.username && result) {
            // console.log(userId[0].username);
            token = jwt.sign({ userId: userId[0]._id, username: userId[0].username }, jwtSecretKey, { expiresIn: '6h' });

            return { userId: userId[0]._id, msg: 'Login Success', token: token };
          } else {
            throw new Error('Username or Password invalid');
          }
        }
      } catch (error) {
        // console.error(error);
        throw new Error('Username or Password invalid');
      }
    },
    CreateSong: async (_, { input }, context) => {
      try {
        verifyJWT(context);

        if (input && input[0] && input[0].title && input[0].artist && input[0].year && input[0].duration && input[0].genre) {
          const songData = input;

          //   for (const arr of songData) {
          const CreateSongs = await Song.create(songData); //create document to database one by one because the body is array of obj
          //   }
          //   console.log(CreateSongs);
          return CreateSongs;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    UpdateSong: async (_, { _id, input }, context) => {
      try {
        // console.log(data);
        verifyJWT(context);
        if ((_id && input) || input.title || input.artist || input.year || input.duration || input.genre) {
          const update = await Song.findByIdAndUpdate(_id, input, { new: true });
          if (!update) {
            throw new Error('song not found');
          }
          return update;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    DeleteSong: async (_, { _id }, context) => {
      try {
        verifyJWT(context);
        if (_id) {
          const chek = await Song.find({ _id: _id });
          const filter = { playlist_name: chek[0].genre + ' Playlist' };

          //delete song also pull from song_ids
          if (chek[0].playlist_id) {
            await Playlist.updateOne(filter, { $pull: { song_ids: _id } });
          }

          const DeleteSong = await Song.findByIdAndRemove(_id, { new: true });
          if (!DeleteSong) {
            throw new Error('song not found');
          }
          return DeleteSong;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    CreatePlaylist: async (_, { name }, context) => {
      try {
        verifyJWT(context);
        const create = await Playlist.create({
          playlist_name: name + ' Playlist',
          song_ids: [],
        });
        return create;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    CreatePlaylistGenre: async (_, { genre }, context) => {
      try {
        verifyJWT(context);
        const songData = await Song.find({ genre: genre });
        if (songData.length === 0) {
          return res.status(500).json({ error: genre + ' song not found' });
        }
        // console.log(songData.map((song) => song._id));
        const create = await Playlist.create({
          playlist_name: genre + ' Playlist',
          song_ids: songData.map((song) => song._id),
        });
        const idplaylist = await Playlist.find({ playlist_name: genre + ' Playlist' }).select('_id');
        await Song.updateMany(
          { genre: genre },
          {
            $set: { playlist_id: idplaylist[0]._id },
          },
          { new: true }
        );
        // console.log(idplaylist[0]._id);
        return create;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    CreatePlaylistArtist: async (_, { artist }, context) => {
      try {
        verifyJWT(context);
        const songData = await Song.find({ artist: artist });
        if (songData.length === 0) {
          throw new Error(artist + ' song not found');
        }
        // console.log(songData.map((song) => song._id));
        const create = await Playlist.create({
          playlist_name: artist + ' Playlist',
          song_ids: songData.map((song) => song._id),
        });
        const idplaylist = await Playlist.find({ playlist_name: artist + ' Playlist' }).select('_id');
        console.log(idplaylist);
        await Song.updateMany(
          { artist: artist },
          {
            $set: { playlist_id: idplaylist[0]._id },
          },
          { new: true }
        );
        // console.log(idplaylist[0]._id);
        return create;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    CreatePlaylistLessOneHour: async (_, args, context) => {
      try {
        verifyJWT(context);
        const song = await Song.find();

        const PlaylistSongs = [];

        // Fungsi untuk mengacak array algoritma Fisher-Yates
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            // console.log(array)
          }
        }
        // const shuffledData = [1,2,3,5,4,6,8,7,4,6,5];
        const shuffledData = [...song];
        shuffleArray(shuffledData);

        let totalDurationInSeconds = 0;

        for (const songs of shuffledData) {
          const songDurationInSeconds = calculateDurationInSeconds(songs.duration); // menyimpan nilai detik dari lagu yang akan di tambah
          if (totalDurationInSeconds + songDurationInSeconds <= 3600) {
            //dicek jika total dutasi sebelumnya + durasi yang akan ditambah akan melebihi 60 menit atau tidak
            PlaylistSongs.push(songs); //jika iya push song lagi
            totalDurationInSeconds += calculateDurationInSeconds(songs.duration); // durasi ditambah
          }
        }

        let totalMinutes = Math.floor(totalDurationInSeconds / 60);
        const totalSeconds = totalDurationInSeconds % 60;
        let totalDuration;
        if (totalSeconds < 10) {
          totalDuration = totalMinutes + ':0' + totalSeconds;
        } else {
          totalDuration = totalMinutes + ':' + totalSeconds;
        }
        let PlaylistSongsIds = [];
        for (const songIds of PlaylistSongs) {
          PlaylistSongsIds.push(songIds._id);
        }

        const createPlay = await Playlist.create({
          playlist_name: 'Playlist less than 1 hour ( ' + totalDuration + ' )',
          song_ids: PlaylistSongsIds,
        });
        const playlistId = await Playlist.findOne({ playlist_name: 'Playlist less than 1 hour ( ' + totalDuration + ' )' });

        for (const song of PlaylistSongs) {
          await Song.findByIdAndUpdate(song._id, { playlist_id: playlistId });
        }
        // console.log(createPlay);
        return createPlay;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    UpdatePlaylistAddSong: async (_, { playlist_name, songId }, context) => {
      try {
        // console.log(songId);
        verifyJWT(context);
        const update = await Playlist.updateOne({ playlist_name: playlist_name + ' Playlist' }, { $push: { song_ids: songId } });
        if (!update) {
          throw new Error('Playlist not found');
        }
        const idplaylist = await Playlist.find({ playlist_name: playlist_name + ' Playlist' });
        await Song.updateOne(
          { _id: songId },
          {
            $set: { playlist_id: idplaylist[0]._id },
          },
          { new: true }
        );

        return idplaylist[0];
      } catch (error) {
        throw new Error(error.message);
      }
    },
    UpdatePlaylistRmvSong: async (_, { playlist_name, songId }, context) => {
      try {
        // console.log(songId);
        verifyJWT(context);
        const update = await Playlist.updateOne({ playlist_name: playlist_name + ' Playlist' }, { $pull: { song_ids: songId } });
        if (!update) {
          throw new Error('Playlist not found');
        }
        const idplaylist = await Playlist.find({ playlist_name: playlist_name + ' Playlist' });
        await Song.updateOne(
          { _id: songId },
          {
            $set: { playlist_id: null },
          },
          { new: true }
        );

        return idplaylist[0];
      } catch (error) {
        throw new Error(error.message);
      }
    },
    DeletePlaylist: async (_, { genre }, context) => {
      try {
        verifyJWT(context);
        const idPlaylist = await Playlist.find({ playlist_name: genre + ' Playlist' }).select('_id');

        await Song.updateMany(
          { playlist_id: idPlaylist[0]._id },
          {
            $set: { playlist_id: null },
          },
          { new: true }
        );
        const DeletePlaylist = await Playlist.deleteOne(
          {
            playlist_name: genre + ' Playlist',
          },
          { new: true }
        );
        if (!DeletePlaylist) {
          throw new Error('playlist_id not found');
        }

        return { message: genre + ' Playlist deleted successfully' };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    Webhook: async (_, { input }, context) => {
      /*
       A webhook is a method for web applications to communicate with each other in real-time. 
       It is a way to send automated, HTTP POST requests from one server to another when a specific event or trigger occurs. 
       Webhooks are commonly used in various scenarios, such as in web development, online services, and automation.
       */
      try {
        // verifyJWT(contex);
        // console.log(input.song_list[0].title);
        let songCount = 0; // just for check total song
        let playlistCount = 0; // just for check total playlist

        //sanity check
        if (input && input.length) {
          for (const playlist of input) {
            playlistCount++;
            if (
              playlist.playlist_name &&
              playlist.description &&
              playlist.song_list &&
              playlist.song_list.length &&
              playlist.creator &&
              playlist.total_favorite
            ) {
              for (const song of playlist.song_list) {
                songCount++;
                // console.log(song.title);
                if (!song.title || !song.artist || !song.year || !song.duration || !song.genre || !song.album) {
                  throw new Error('All songs field must be filled');
                }
              }
            }
          }

          const response = await fetch('https://webhook.site/b09df7a0-a300-4e0c-ac7e-165d5c646226', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 'Content-Type': 'application/json' },
          });
          //add sanity response
          const data = await response.json();

          if (!data) {
            throw new Error('Data not fetched');
          }

          const result = data.map((dataPlaylist) => {
            return {
              msg: `${dataPlaylist.playlist_name} playlist successfully created`,
              ...dataPlaylist,
            };
          });
          // console.log(util.inspect(result, { depth: 100 }));

          console.log({
            total_song: songCount,
            total_playlist: playlistCount,
          });
          return result;
          // return {
          //   msg: 'Create Playlists Success',
          //   playlist_name: setPlaylistName,
          //   creator: setCreator,
          //   total_playlist: playlistCount,
          //   total_songs: songCount,
          // };
        }

        return {
          playlist_name: 'Error',
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    PlaySong: async () => {
      try {
        const song = await PlaySong();
        if (song) {
          return 'Playing Song';
        } else {
          return 'Song not availaible';
        }
      } catch (error) {
        return "Can't Playing song every 5 minute";
      }
    },
  },
  Playlist: {
    async song_ids(parent, args, context) {
      try {
        return await context.songLoader.loadMany(parent.song_ids); //load single data
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Song: {
    async playlist_id(parent, args, context) {
      try {
        if (parent.playlist_id != null) {
          return await context.PlaylistLoader.load(parent.playlist_id); //load single data
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

function verifyJWT(context) {
  try {
    const token = context.req.headers.authorization;
    if (!token) {
      throw new Error('Token not Found'); //if token null/empty
    }

    let userpass;
    //chek the token baerer token or from header
    if (token.split(' ').length === 2) {
      //barear ladkjwahdnlawd
      userpass = token.split(' ')[1];
    } else if (token.split(' ').length === 1) {
      //ladkjwahdnlawd
      userpass = token;
    }
    jwt.verify(userpass, 'plered');
  } catch (error) {
    throw new Error('Password or Username invalid');
  }
}
module.exports = { typeDefs, resolvers };
