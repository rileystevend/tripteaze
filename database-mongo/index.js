const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let uri;


if (!process.env.MONGODB_URI) {
  let config = require('../config.js');
  uri = config.mongo;
} else {
  console.log('PROCESS PICKED UP', process.env.MONGODB_URI);
  uri = process.env.MONGODB_URI;
}
//URI is stored either on heroku or local config file
let Schema = mongoose.Schema;
mongoose.connect(uri, {useMongoClient: true, promiseLibrary: require('bluebird')});

let db = mongoose.connection;

db.on('error', function() {
  console.log(uri);
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

function toLower(v) {
  return v.toLowerCase();
}

let userSchema = Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    set: toLower,
    index: true,
    required: [true, 'can\'t be blank'],
  },
  password: String,
});

let tripSchema = Schema({
  id: Schema.Types.ObjectId,
  city: String,
  tripFromDate: Date,
  tripToDate: Date,
  isPublic: {type: Boolean, default: false},
  isArchived: {type: Boolean, default: false},
  //need to make sure each trip has a reference user
  user: {type: Schema.Types.ObjectId, ref: 'User'},

});

let restaurantSchema = Schema({
  id: {type: Number, index: true},
  name: String,
  url: String,
  address: String,
  zip: Number,
  logo: String,
  //latitude and longitude coordinates are placed in 'location' property
  location: [{type: Number}],
  price: Number,
  //need to make sure each restaurant or event has a reference trip
  trip: {type: Schema.Types.ObjectId, ref: 'Trip'},
});

let hotelSchema = Schema({
  id: {type: String, index: true},
  name: String,
  url: String,
  address: String,
  zip: Number,
  logo: String,
  //latitude and longitude coordinates are placed in 'location' property
  location: [{type: Number}],
  price: Number,
  //need to make sure each restaurant or event has a reference trip
  trip: {type: Schema.Types.ObjectId, ref: 'Trip'},
});


let eventSchema = Schema({
  id: {type: Number, index: true},
  name: String,
  description: String,
  url: String,
  start_time: String,
  end_time: String,
  is_free: Boolean,
  organizer_id: Number,
  venue_id: Number,
  category_id: Number,
  logo: String,
  //need to make sure each restaurant or event has a reference trip
  trip: {type: Schema.Types.ObjectId, ref: 'Trip'},
});

let User = mongoose.model('User', userSchema);
let Trip = mongoose.model('Trip', tripSchema);
let Restaurant = mongoose.model('Restaurant', restaurantSchema);
let Event = mongoose.model('Event', eventSchema);
let Hotel = mongoose.model('Hotel', hotelSchema);

let addNewTrip = (username, city, fromDate, toDate, callback) => {
  User.findOne({name: username}, function(err, user) {
    if (err) {
      callback(err);
    }
    Trip.create({
      id: new mongoose.Types.ObjectId(),
      city: city,
      user: user.id,
      // Dates need to be in YYYY-MM-DD format
      tripFromDate: fromDate,
      tripToDate: toDate,
    }, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  });
};

const addRestaurantToTrip = async (food, tripId) => {
  let trip = await Trip.findOne({id: tripId});
  let addRest =  await Restaurant.findOneAndUpdate(
    {id: food.restaurant.id},
    {$set: {
      id: food.restaurant.id,
      name: food.restaurant.name,
      url: food.restaurant.url,
      logo: food.restaurant.featured_image,
      address: food.restaurant.location.address,
      zip: food.restaurant.location.zipcode,
      location: [food.restaurant.location.latitude, food.restaurant.location.longitude],
      price: food.restaurant.price_range,
      trip: trip.id,
    },
    }, {upsert: true, new: true});
  return addRest;
};


let addHotelToTrip = async (hotel, tripId) => {
  let trip = await Trip.findOne({id: tripId});
  //then add event to database based on trip ID
  //need to look at eventbrite API for structure
  return Hotel.findOneAndUpdate({id: hotel.id},
    {$set: {
      name: hotel.name,
      // description: event.description.text,
      id: hotel.place_id,
      // url: event.url,
      // start_time: event.start.local,
      // end_time: event.end.local,
      // is_free: event.is_free,
      // organizer_id: event.organizer_id,
      // venue_id: event.venue_id,
      // category_id: event.category_id,
      logo: hotel.icon,
      trip: trip.id,
    }},
    {upsert: true, new: true});
};

let addEventToTrip = async (event, tripId) => {
  let trip = await Trip.findOne({id: tripId});

  let addEvent = await Event.findOneAndUpdate({id: event.id},
    {$set: {
      name: event.name.text,
      description: event.description.text,
      id: event.id,
      url: event.url,
      start_time: event.start.local,
      end_time: event.end.local,
      is_free: event.is_free,
      organizer_id: event.organizer_id,
      venue_id: event.venue_id,
      category_id: event.category_id,
      logo: event.logo.url,
      trip: trip.id,
    }},
    {upsert: true, new: true}); //requires new option or will return null
  return addEvent;
};

//for signup page-takes in username and password and adds user info to database
//need to make sure usernames are unique in db
let addNewUser = (name, password) => {
  User.findOneAndUpdate({name: name},
    {$set: {
      id: new mongoose.Types.ObjectId(),
      name: name,
      password: password,
    },
    }, {upsert: true},
    function(err) {
      if (err) {
        console.log('error: ', err);
      }
    }
  );
};

// checks if username already exists in the database and
// returns that user
let userExists = (username) => {
  // checks database based on input username
  return User.findOne({ name: new RegExp('^'+username+'$', 'i') });
};

//for login page-take in username and retrieve password from db
//on server side, bcrypt will be used to compare user input password to stored db password
//if they match user will be logged in, otherwise error message
let retrieveUserPassword = (username) => {
  return User.findOne({ name: username });
};


//for user page-display all existing trips for user after being logged in
let showUserTrips = (username, callback) => {
  //first find corresponding user
  User.findOne({name: username}, function(err, user) {
    if (err || user === null) {
      console.log('error: ', err);
      callback(err);

    } else {
      //then find all trips for selected user
      Trip.find({user: user.id}, function(err, trips) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, trips);
        }
      });
    }
  });
};


//allows user to update whether trip is public, archived, and/or if the trip dates changed
//assumes username and city are known to obtain corresponding trip and update
let modifyTripDetails = (makePublic, makeArchived, username, fromDate, toDate, city, callback) => {
  //first find corresponding user
  User.findOne({name: username}, function(err, user) {
    if (err) {
      callback(err);
      console.log('error: ', err);
    }
    //then find corresponding trip based on city for selected user
    Trip.findOne({user: user.id, city: city}, function(err, trip) {
      if (err) {
        callback(err);
        console.log('error', err);
      }
      //makePublic = makePublic || trip.isPublic;
      makeArchived = makeArchived || trip.isArchived;
      let newFromDate = fromDate || trip.tripFromDate;
      let newToDate = toDate || trip.tripToDate;
      Trip.update({id: trip.id},
        {$set:
          {
            isPublic: makePublic,
            isArchived: makeArchived,
            tripFromDate: newFromDate,
            tripToDate: newToDate,
          },
        }, function(err) {
          if (err) {
            callback(err);
            console.log('error: ', err);
          } else {
            callback();
          }
        }
      );
    });
  });
};

let getTripEvents = (tripID, callback) => {
  Event.find({ trip: tripID }, function(err, events) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, events);
    }
  });
};

let getTripRestaurants = (tripID, callback) => {
  Restaurant.find({ trip: tripID }, function(err, eatin) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, eatin);
    }
  });
};

let getTripHotels = (tripID, callback) => {
  Hotel.find({ trip: tripID }, function(err, hotel) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, hotel);
    }
  });
};

//removal function assumes we know the ID of the restaurant, event,
//or trip that we are wanting to remove from the database
let remove = (modelType, ID, callback) => {
  if (modelType === 'restaurant') {
    Restaurant.remove( {id: ID}, function(err) {
      if (err) {
        console.log('error: ',err);
        callback(err);
      } else {
        callback();
      }
    });
  } else if (modelType === 'event') {
    Event.remove( {id: ID}, function(err) {
      if (err) {
        callback(err);
        console.log('error: ',err);
        callback(err);
      } else {
        callback();
      }
    });
  } else if (modelType === 'hotel') {
    console.log('hotel id', ID);
    Hotel.remove( {id: ID}, function(err) {
      if (err) {
        console.log('error: ',err);
        callback(err);
      } else {
        callback();
      }
    });
  } else if (modelType === 'trip') {
    Trip.remove( {id: ID}, function(err) {
      if (err) {
        callback(err);
        console.log('error: ',err);
        callback(err);
      } else {
        callback();
      }
    });
  } else {
    console.log('must specify correct model type to remove');
    // callback(err); // there is no err here...
  }
};
//for home page-displays all existing public trips
let showAllPublicTrips = (callback) => {
  Trip.find({isPublic: true}, function(err, trips) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, trips);
    }
  });
};

module.exports = {
  addNewTrip,
  addRestaurantToTrip,
  addHotelToTrip,
  addEventToTrip,
  addNewUser,
  retrieveUserPassword,
  showUserTrips,
  modifyTripDetails,
  remove,
  showAllPublicTrips,
  userExists,
  getTripRestaurants,
  getTripEvents,
  getTripHotels,
};

// module.exports.addNewTrip = addNewTrip;
// module.exports.addRestaurantToTrip = addRestaurantToTrip;
// module.exports.addEventToTrip = addEventToTrip;
// module.exports.addNewUser = addNewUser;
// module.exports.retrieveUserPassword = retrieveUserPassword;
// module.exports.showUserTrips = showUserTrips;
// module.exports.modifyTripDetails = modifyTripDetails;
// module.exports.remove = remove;
// module.exports.showAllPublicTrips = showAllPublicTrips;
// module.exports.userExists = userExists;
// module.exports.showTripEvents = showTripEvents;
// module.exports.showTripRestaurants = showTripRestaurants;
// module.exports.getTripRestaurants = getTripRestaurants;
// module.exports.getTripEvents = getTripEvents;


// {restaurant: {
//   R: { res_id: 16608481 },
//   apikey: '4c7506bb724adf55c75f64091cfc569e',
//   id: '16608481',
//   name: 'Old Woolstore',
//   url: 'https://www.zomato.com/kingston-se-sa/old-woolstore-kingston-se?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1',
//   location: {
//     address: '11 Hansen St Kingston Sa, Kingston SE',
//     locality: 'Kingston SE',
//     city: 'Kingston SE',
//     city_id: 1814,
//     latitude: '-36.8287500000',
//     longitude: '139.8503820000',
//     zipcode: '5275',
//     country_id: 14,
//     locality_verbose: 'Kingston SE, Kingston SE'
//     },
//   switch_to_order_menu: 0,
//   cuisines: 'Others',
//   average_cost_for_two: 30,
//   price_range: 3,
//   currency: '$',
//   offers: [],
//   thumb: '',
//   user_rating: {
//     aggregate_rating: '2.8',
//     rating_text: 'Average',
//     rating_color: 'FFBA00',
//     votes: '4'
//     }
//   }
// }
