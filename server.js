'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var apiRoutes = require('./routes/api.js');
var fccTestingRoutes = require('./routes/fcctesting.js');
var runner = require('./test-runner');

const config = require('./utils/config');
const mongoose = require('mongoose');
const helmet = require("helmet");
const nocache = require('nocache')

    var app = express();

console.log('connecting to DB URI');

const serverConnected = async() => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to mongo DataBase: '+config.selectedDB);
    } catch (error) {
        console.log('Error connection to MongoDB:', error.message);
    }
};

app.use(helmet());

app.use(nocache());
app.use(helmet.hidePoweredBy({
        setTo: 'PHP 4.2.0'
    }));

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({
        origin: '*'
    })); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
    }));

//Index page (static HTML)
app.route('/')
.get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
    res.status(404)
    .type('text')
    .send('Not Found');
});

//Start your server and tests!
app.listen(config.PORT || 3000, async function () {
    console.log("Listening on port " + config.PORT + ", " + config.NODE_ENV + " mode");

    try {
        await serverConnected();

        if (config.NODE_ENV === 'test') {
            console.log('Running Tests...');
            setTimeout(function () {
                try {
                    runner.run();
                } catch (e) {
                    var error = e;
                    console.log('Tests are not valid:');
                    console.log(error);
                }
            }, 3500);
        }
    } catch (err) {
        return console.error(err);
    }
});

module.exports = app; //for unit/functional testing
