const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://Cluster58134:DatabasePassword49@cluster58134.msu3tjj.mongodb.net/'

const User = require('../models/userModel')
const Game = require('../models/gameModel')

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to DB 🤟'))
  .catch((err) => console.log(err))

const dummyUsers = [
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17af'),
      username: 'johnDoe',
      password: 'password123',
      fullName: 'John Doe',
      favoriteSports: ['basketball', 'golf'],
      location: {
        type: 'Point',
        coordinates: [-118.2437, 34.0522]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b0'),
      username: 'janeSmith',
      password: 'password456',
      fullName: 'Jane Smith',
      favoriteSports: ['golf'],
      location: {
        type: 'Point',
        coordinates: [-118.2637, 34.0722]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b1'),
      username: 'robertBrown',
      password: 'password789',
      fullName: 'Robert Brown',
      favoriteSports: ['basketball'],
      location: {
        type: 'Point',
        coordinates: [-118.2237, 34.0322]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b2'),
      username: 'lucyGreen',
      password: 'password101',
      fullName: 'Lucy Green',
      favoriteSports: ['golf'],
      location: {
        type: 'Point',
        coordinates: [-118.2330, 34.0625]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b3'),
      username: 'michaelWhite',
      password: 'password202',
      fullName: 'Michael White',
      favoriteSports: ['basketball'],
      location: {
        type: 'Point',
        coordinates: [-118.2530, 34.0425]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b4'),
      username: 'susanGray',
      password: 'password303',
      fullName: 'Susan Gray',
      favoriteSports: ['golf', 'basketball'],
      location: {
        type: 'Point',
        coordinates: [-118.2130, 34.0525]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b5'),
      username: 'davidBlack',
      password: 'password404',
      fullName: 'David Black',
      favoriteSports: ['golf'],
      location: {
        type: 'Point',
        coordinates: [-118.2430, 34.0620]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b6'),
      username: 'annaBlue',
      password: 'password505',
      fullName: 'Anna Blue',
      favoriteSports: ['basketball'],
      location: {
        type: 'Point',
        coordinates: [-118.2535, 34.0520]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b7'),
      username: 'paulRed',
      password: 'password606',
      fullName: 'Paul Red',
      favoriteSports: ['golf', 'basketball'],
      location: {
        type: 'Point',
        coordinates: [-118.2335, 34.0420]
      },
      attendingGames: [],
      hostedGames: []
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b8'),
      username: 'lindaYellow',
      password: 'password707',
      fullName: 'Linda Yellow',
      favoriteSports: ['basketball'],
      location: {
        type: 'Point',
        coordinates: [-118.2235, 34.0720]
      },
      attendingGames: [],
      hostedGames: []
    }
];
  
const createUsers = async (users) => {
  for (const user of users) {
    const newUser = new User(user)
    await newUser.save()
  }
}

const dummyGames = [
  {
    location: { type: 'Point', coordinates: [-118.1124, 34.0116] },
    gameName: 'Golf at Sunny Meadows',
    sport: 'golf',
    address: '123 Fairway Ave, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17af'),
    partySize: 4,
    dateTime: new Date('2023-12-10T09:30:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17af'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b0')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.1435, 34.0217] },
    gameName: 'Basketball at LA Court',
    sport: 'basketball',
    address: '456 Basketball St, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b1'),
    partySize: 10,
    dateTime: new Date('2023-12-12T16:30:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b1'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b2'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b3')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.1535, 34.0317] },
    gameName: 'Downtown Basketball Shootout',
    sport: 'basketball',
    address: '789 Downtown Ct, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b2'),
    partySize: 5,
    dateTime: new Date('2023-12-13T17:00:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b2'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b3')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.1635, 34.0418] },
    gameName: 'Beachside Golf Fun',
    sport: 'golf',
    address: '101 Beach Rd, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b3'),
    partySize: 3,
    dateTime: new Date('2023-12-14T10:00:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b3')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.1735, 34.0519] },
    gameName: 'Late Night Basketball Challenge',
    sport: 'basketball',
    address: '202 Midnight Ct, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b4'),
    partySize: 8,
    dateTime: new Date('2023-12-15T20:00:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b4'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b5'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b6')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.1835, 34.0619] },
    gameName: 'Weekend Golf with Friends',
    sport: 'golf',
    address: '303 Weekend Dr, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b5'),
    partySize: 4,
    dateTime: new Date('2023-12-16T11:00:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b5')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.1935, 34.0719] },
    gameName: 'Street Basketball Battle',
    sport: 'basketball',
    address: '404 Street Ave, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b6'),
    partySize: 6,
    dateTime: new Date('2023-12-17T16:30:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b6'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b7')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.2035, 34.0819] },
    gameName: 'Morning Golf Session',
    sport: 'golf',
    address: '505 Morning Pl, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b7'),
    partySize: 3,
    dateTime: new Date('2023-12-18T09:00:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b7')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.2135, 34.0919] },
    gameName: 'Basketball Championship',
    sport: 'basketball',
    address: '606 Championship Blvd, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b8'),
    partySize: 10,
    dateTime: new Date('2023-12-19T18:00:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b8'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b1'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b2')
    ],
  },
  {
    location: { type: 'Point', coordinates: [-118.2235, 34.1019] },
    gameName: 'Golf Pros Meetup',
    sport: 'golf',
    address: '707 Pros Rd, Los Angeles, CA, USA',
    host: new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17af'),
    partySize: 4,
    dateTime: new Date('2023-12-20T10:30:00.000Z'),
    attending: [
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17af'),
      new mongoose.Types.ObjectId('60d5ec9af682fbd39c2d17b0')
    ],
  },
  
];

const createGames = async (games) => {
for (const game of games) {
  const newGame = new Game(game)
  const hostUser = await User.findById(newGame.host)
  hostUser.hostedGames.push(newGame._id)
  await hostUser.save()
  for (const attending of newGame.attending) {
    const attendingUser = await User.findById(attending._id)  
    attendingUser.attendingGames.push(newGame._id)
    await attendingUser.save()
  }
  await newGame.save()
}
}


const buildDB = async () => {
  await createUsers(dummyUsers)
  await createGames(dummyGames)
}

buildDB()
