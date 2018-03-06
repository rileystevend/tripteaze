# TripTeaze

> Pithy project description

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x

## Development

npm run react-dev
npm run server-dev

### Installing Dependencies

From within the root directory:

npm install

you'll need a gitignored config.js file in the root directory for API keys: 'token' for eventbrite, 'zomatoKey' for zomato and 'mongo' a url to an mlab mongodb.  Get your own keys or ask us for ours.  

The heroku deployment uses process.env variables for these EVENTBRITE, ZOMATO and MONGODB_URI respectively, set those up on heroku

### Roadmap

-new found bug, when you delete events/activities on the userpage it deletes it from the wrong trip
-when you try and delete your last trip it does delete but it doesn't disappear right away
-more search options
-implement archiving of your own trips
-sorting of your trips
-comment/review system
-friending
-instagram api 4 more pics
-getting session stuff to work?
-passport
-anon user creating trips
-once trip dates have changed, have any events outside of the new date range removed
-Use archived parameter of trips somehow
-Make page transitions better


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
