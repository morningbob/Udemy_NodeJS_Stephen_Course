module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		// stop the chain of middleware progress
		return res.status(403).send({error: 'Not enough credits!'});
	}
	// everything is good, please continue
	next();
};