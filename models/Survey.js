const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	// the RecipientSchema is a sub document collection
	// which used in ownership relationships
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// the _ underscore is to indicate that we are 
	// referring to another object
	// the relationship is "belongs to"
	_user: { type: Schema.Types.ObjectId, ref: 'User'}
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);