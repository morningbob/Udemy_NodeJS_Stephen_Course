// next is a function to call, after middleware finished
// next means pass to the next middleware
module.exports = (req, res, next) => {
	if (!req.user) {
		// stop the chain of middleware progress
		return res.status(401).send({error: 'You must log in!'});
	}
	// everything is good, please continue
	next();
};

