const mongoose = require('mongoose')
require('dotenv').config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(`mongodb+srv://keen:${process.env.PASS}@keen.sqzr5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions)
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        
        mongoose.connection.on('connected', () => {
            console.log('Connected to the database!')
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from the database!')
        });
         
        mongoose.connection.on('err', (err) => {
            console.log('There was an error trying to connect to the database: ' + err)
        });

    }
}