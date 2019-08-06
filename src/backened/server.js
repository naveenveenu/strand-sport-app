const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const sportRoutes = express.Router();
const PORT = 4000;
let Login = require('./login.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/strand', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

sportRoutes.route('/').get(function(req, res) {
    Login.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});


sportRoutes.route('/login/:id').get(function(req, res) {
    var newLogin = {UserName: req.params.id};
    Login.find(newLogin, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            res.json(todo);
    });
});

sportRoutes.route('/login').post(function(req, res) {
    let createEntry = new Login(req.body);
    createEntry.save()
        .then(todo => {
            res.status(200).json({'user': 'user added successfully to the database'});
        })
        .catch(err => {
            res.status(400).send('Registration failed. Try again');
        });
});

sportRoutes.route('/team').post(function(req, res) {
    let createEntry = new Team(req.body);
    createEntry.save()
        .then(todo => {
            res.status(200).json({'team': 'team added successfully to the database'});
        })
        .catch(err => {
            res.status(400).send('Team registration failed. Try again');
        });
});

sportRoutes.route('/team/:id').get(function(req, res) {
    let createEntry = new Team(req.body);
    createEntry.save()
        .then(todo => {
            res.status(200).json({'team': 'team added successfully to the database'});
        })
        .catch(err => {
            res.status(400).send('Registration failed. Try again');
        });
});

sportRoutes.route('/team/').get(function(req, res) {
    let teamListing = new Team();
    teamListing.list()
        .then(todo => {
            res.status(200).json({'team': 'team added successfully to the database'});
        })
        .catch(err => {
            res.status(400).send('Registration failed. Try again');
        });
});

app.use('/strand', sportRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
