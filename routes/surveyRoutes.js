const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
module.exports = app => {
	// here we check if user already loggin and if he has enough credits
	// we use 2 middlewares
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		// in this req, we expect req has title, body, subject and recipients
		const { title, subject, body, recipients } = req.body;
		// that all these info are expected in req's body
		// create instance of survey
		const survey = new Survey({
			title: title,
			body: body,
			subject: subject,
			// for recipients, we'll create individual sub doc object of 
			// recipients from every email.
			// collect them in an array and assign it to recipients field
			recipients: recipients.split(',').map(
				email => { return { email: email.trim() }}),
			// link back to the user
			_user: req.user.id,
			dataSent: Date.now()
		});
	});
};