import express from 'express';
import path from 'path'; // Just the node module

const app = express(); 

// Make post request to /api/auth route
app.post('/api/auth', (req, res) => {
    res.status(400).json({ errors: { global: "Invalid Credentials" } }); // Global key
}); // We create auth route where it always responds with error object and status 400
// This status is not okay and throws an error in our React code and we catch and display this error from the server to the user

// Define route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // To get the name index.html and render it in this particular folder
});

// TO define which port to use
app.listen(8080, () => console.log("Currently Running on localhost:8080"));
