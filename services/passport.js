const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});
// after the authentication is successful, we got accessToken
// as a string and then execute that function
// that accessToken has the identified user and his info I
// requested eariler
// User.findOne returns a promise, we can find the result from it
// if user exists, there will be an existingUser object
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	proxy: true
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ googleId: profile.id })
		.then((existingUser) => {
			if (existingUser) {
				// we already have a record with the given profile
				return done(null, existingUser);
			} else {
				// we don't have
				new User( { googleId: profile.id }).save()
				.then(user => done(null, user));
			}
		});
	}
));