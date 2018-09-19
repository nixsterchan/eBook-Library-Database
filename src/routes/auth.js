import express from 'express';
import User from '../models/User';

const router = express.Router();

// We can define any kind of router here
router.post("/", (req, res) => {
    const { credentials } = req.body; // We do not have the request body because in express, we require body parser to parse the body
    User.findOne({ email: credentials.email })
        .then(user => { // Promise is returned here which passes us user
            
            // user can be either null if nothing is found, or is the actual record
            if (user && user.isValidPassword(credentials.password)) {
                res.json({ user: user.toAuthJSON() });
            } else {
                res.status(400).json({ errors: { global: "Invalid Credentials" } });
            }
        });
});
// Credentials contain email and password, we want to find user by these and check if the password is correct
// To do that, we require a User mongoose model

export default router;