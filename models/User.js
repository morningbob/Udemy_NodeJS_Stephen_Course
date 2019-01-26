const mongoose = require('mongoose');
const { Schema } = mongoose;

// mongo needs to know the schema beforehand
const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

// create the model
mongoose.model('users', userSchema);

