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
// callbackURL: '/auth/google/callback', replace this line for production
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	//proxy: true
	}, 
	async (accessToken, refreshToken, profile, done) => {
		const existingUser = await User.findOne({ googleId: profile.id })
		if (existingUser) {
			// we already have a record with the given profile
			return done(null, existingUser);
		} 
			// we don't have
			const user = await new User( { googleId: profile.id }).save()
			done(null, user);
	}
));