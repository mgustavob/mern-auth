require('dotenv').config();

// a passport strategy for authenticating with json web token
// this allows to authenticate enpoints using the token
const JwtSrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const { deserializeUser } = require('passport');
// const User = mongoose.model('User');

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_Secret;

module.exports = (passport) =>{
    passport.use(new JwtSrategy(options, (jwt_payload, done) =>{
        deserializeUser.findById(jwt_payload.id)
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
