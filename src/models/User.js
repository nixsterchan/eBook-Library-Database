import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

// TODO: Add uniqueness and email validation for email field
const schema = new mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true, index: true, unique: true},
        passwordHash: { type: String, required: true },
        confirmed: { type: Boolean, default: false }
    }, 
    { timestamps: true } // Second argument we provide here is a time stamp, which handles created and updates as , handled for us
);

// Define instance method on this model
schema.methods.isValidPassword = function isValidPassword(password) {
    // Returns boolean depending on the result of the comparison of the hashes with bcrypt
    return bcrypt.compareSync(password, this.passwordHash);
};

// For setting password
schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
};

// Generates our JSON web tokens
// sign() is the method in which we create and encrypt our web token
schema.methods.generateJWT = function generateJWT() {
    // First parameter is the public data which is not encrypted so anyone can take this token, run it through the
    // decoder and get the data. It is purely intentional as it is public data
    // And the second parameter is the secret key
    return jwt.sign({
        email: this.email
    }, 
    process.env.JWT_SECRET
    );
};

// Function that will create objects that we want to pass down to our client,
// we do not want to pass down the whole record and this is not good to do in the route itself
schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT(),
        confirmed: this.confirmed
    }
}

// To validate that email is unique, we use the uniqueValidator, where we just use it as a plugin
schema.plugin(uniqueValidator, { message: "This Email Is Already In Use"});

// First argument is the model name, which is pluralized by mongoose, 
// and this becomes the name of the collection that is searched in MongoDB database
// IMPORTANT: need to define schema for this particular model
export default mongoose.model("User", schema); 