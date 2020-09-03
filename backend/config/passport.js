require('dotenv').config();

// a passport strategy for authenticating with json web token
// this allows to authenticate enpoints using the token
const JwtSrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const { deserializeUser } = require('passport');
const User = mongoose.model('User');

// options is an object containing optons to control
// how the token is extracted from the request or verified
const options = {}
// jwtFromRequest (REQUIRED) function that accepts a request as the only
// parameter and returns either the JWT as a string or null
// fromAuthHeaderAsBearerToken() creates an extractor that looks for the
// JWT in the auth header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_Secret;

module.exports = (passport) =>{
    passport.use(new JwtSrategy(options, (jwt_payload, done) =>{
        User.findById(jwt_payload.id)
        // jwt_payloads is an object literal containing the decoded JWT payload
        // done is a passport callback that has error first as an argument done(error, user, info)
        .then(user=>{
            if (user) {
                // if user is found, return a null (for error) and user
                return done(null, user);
            } else {
                // no user is found
                return done(null, false)
            }
        })
        .catch(err=> console.log(err));
    }))
}
