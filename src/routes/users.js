import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';

// We want to create new user model

const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body.user;
    const user = new User({ email });
    // Next we must set password as we only have passwordHash
    user.setPassword(password);
    // Save the password with the following. It will return promise
    // If everything is ok, it will return user record to us, else it will throw an error
    user.save()
        .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) })); 
});

export default router;