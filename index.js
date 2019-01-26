const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User.js');
require('./models/Survey');
require('./services/passport.js');

// we only care about running the passport.js, not getting a ref for it

mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const app = express();
//require('./routes/authRoutes.js')(app);

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// for encrytion
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file
	// if there is some request that express don't understand
	// this first case here, forward everything to client's files
	// so if client don't have the file, then the second block will
	// be executed.
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	// so the following code is the last resort
	// forward to index.html
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
};

const PORT = process.env.PORT || 5000;
app.listen(PORT);