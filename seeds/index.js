const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console , "connection error:"))
db.once("open", ()=>{
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for (let i = 0; i <200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) + 10
        const camp = new Campground({
           location : `${cities[random1000].city}, ${cities[random1000].state}`, 
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [ 
                {
                    url:'https://res.cloudinary.com/visen/image/upload/v1609983312/YelpCamp/bbxkzazq85vvyh3xv9u3.jpg',
                    filename: 'YelpCamp/bbxkzazq85vvyh3xv9u3' 
                 },
                 {
                    url:'https://res.cloudinary.com/visen/image/upload/v1609983313/YelpCamp/x558htkerlx6onqtp44u.jpg',
                    filename: 'YelpCamp/x558htkerlx6onqtp44u' } ],
            description: 'Lorem Ipsum',
            
            author: '5fe06d82296b1830ce5d1b48',
            price,
            geometry:
                { type: 'Point',
                  coordinates: [
                      cities[random1000].longitude,
                      cities[random1000].latitude
                  ]
                 }

        })
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})