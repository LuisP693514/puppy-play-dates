const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Marker = require('../models/Marker');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const DateRequest = require('../models/DateRequest');

const NUM_SEED_USERS = 25;

// Create users
const users = [];

const minLong = -74.0000;
const maxLong = -73.9876;
let randomLong;

const minLat = 40.7395;
const maxLat = 40.7331;
let randomLat;

const preseeded_locations = []
for (let i = 0; i < NUM_SEED_USERS; i++) {
    
    randomLong = (Math.random() * (maxLong - minLong)) + minLong;
    randomLat = (Math.random() * (maxLat - minLat)) + minLat;
    preseeded_locations.push([randomLat, randomLong])
}

users.push(
    new User({
        username: 'demo-user',
        email: 'demo-user@appacademy.io',
        hashedPassword: bcrypt.hashSync('password', 10),
        profileImageUrl: "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/animal-g765307ffb_1280.png",
        latitude: 40.7363, 
        longitude: -73.9938
    })
)


let generatedNumbers = [];

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let profileImage;
    while (profileImage === undefined) {
        const randomNumber = Math.floor(Math.random() * NUM_SEED_USERS);
        const dogTemperaments = ['affectionate','agile','alert','brave','calm','cheerful','confident',
                                'courageous','curious','docile','energetic','friendly','gentle','happy',
                                'independent','intelligent','loyal','obedient','playful','protective','quiet',
                                'reliable','sensitive','smart','social','stubborn','trainable','vigilant','watchful'];
        const dogBreeds = ["Beagle","Dalmatian","Greyhound","Chow Chow","Golden Retriever","Siberian Husky","Great Dane","Dachshund",
                            "Bulldog","Poodle","Boxer","Labrador Retriever","Chihuahua","Pomeranian","Bichon Frise","Border Collie",
                            "Corgi","Akita","Shih Tzu","Bernese Mountain Dog","Cane Corso","Rhodesian Ridgeback","Shar Pei",
                            "Weimaraner","Basenji","Mastiff","Newfoundland","Pug","Saint Bernard","Shiba Inu"];

        if (!generatedNumbers.includes(randomNumber)) {
            generatedNumbers.push(randomNumber);
            profileImage = `https://puppyplaydates.s3.us-east-2.amazonaws.com/public/${randomNumber}profilepic.png`
            users.push(
                new User({
                    username: faker.internet.userName(firstName, lastName),
                    email: faker.internet.email(firstName, lastName),
                    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
                    latitude: preseeded_locations[i][0],
                    longitude: preseeded_locations[i][1],
                    profileImageUrl: profileImage,
                    puppyName: faker.animal.dog(),
                    puppyBreed: dogBreeds[Math.floor(Math.random() * dogBreeds.length)],
                    puppyAge: faker.datatype.number({ min: 1, max: 30 }),
                    name: faker.name.findName(),
                    ownerAge: faker.datatype.number({ min: 10, max: 100 }),
                    puppyTemperament: dogTemperaments[Math.floor(Math.random() * dogTemperaments.length)],
                    puppyVaccinated: faker.datatype.boolean()
                })
            )
        }

    }

}

const markers = []

markers.push(
    new Marker({
        markerType: 'dogPark',
        latitude: 40.7356,
        longitude: -73.9910
    }),

    new Marker({
        markerType: 'dogPark',
        latitude: 40.730432427292016,
        longitude: -73.99762672202375
    }),

    new Marker({
        markerType: 'dogPark',
        latitude: 40.733151097780606,
        longitude: -73.98393676227361
    }),

    new Marker({
        markerType: 'vet',
        latitude: 40.7385175547654,
        longitude: -73.9892033826281
    }),

    new Marker({
        markerType: 'vet',
        latitude: 40.7328094398341,
        longitude: -73.99468473419279
    }),

    new Marker({
        markerType: 'vet',
        latitude: 40.738584183565344,
        longitude: -73.9962968964177
    }),

    new Marker({
        markerType: 'petStore',
        latitude: 40.738922458615654,
        longitude: -73.99524187653974
    }),

    new Marker({
        markerType: 'petStore',
        latitude: 40.73905229623414,
        longitude: -73.99535611634302
    }),

    new Marker({
        markerType: 'petStore',
        latitude: 40.737212906337206,
        longitude: -73.9902153251958
    }),

    new Marker({
        markerType: 'petStore',
        latitude: 40.73963656238125, 
        longitude: -73.98992972568763
    }),

    new Marker({
        markerType: 'groomer',
        latitude: 40.737284820240276,
        longitude: -73.98996213895228
    }),

    new Marker({
        markerType: 'groomer',
        latitude: 40.73505160156264,
        longitude: -73.99939342658173
    }),

    new Marker({
        markerType: 'groomer',
        latitude: 40.743998638315944, 
        longitude: -73.9906181686328
    })
)

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    console.log("Resetting db and seeding users");

    User.collection.drop()
        .then(() => Marker.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Marker.insertMany(markers))
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}