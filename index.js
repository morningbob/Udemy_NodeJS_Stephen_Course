const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User.js');
require('./services/passport.js');
// we only care about running the passport.js, not getting a ref for it

mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const app = express();
require('./routes/authRoutes.js')(app);

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// for encrytion
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT);