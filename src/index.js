import express from 'express';
import path from 'path'; // Just the node module
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import auth from './routes/auth';
import users from './routes/users';

dotenv.config(); // To set up env
const app = express(); 

// When we instantiate application
app.use(bodyParser.json()); // We only use json for now 

// We override the built in mongo promise library with Bluebird promise library
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true }); // IMPORTANT. To connect to MongoDB

// // Make post request to /api/auth route
// app.post('/api/auth', (req, res) => {
//     res.status(400).json({ errors: { global: "Invalid Credentials" } }); // Global key
// }); // We create auth route where it always responds with error object and status 400
// // This status is not okay and throws an error in our React code and we catch and display this error from the server to the user

app.use('/api/auth', auth);
app.use('/api/users', users);

// Define route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // To get the name index.html and render it in this particular folder
});

// TO define which port to use
app.listen(8080, () => console.log("Currently Running on localhost:8080"));

