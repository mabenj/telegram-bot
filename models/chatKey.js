const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

const chatKeySchema = new mongoose.Schema({
	chatKey: {
		type: String,
		required: true,
		unique: true,
		dropDups: true,
		default: () => nanoid()
	},
	chatId: {
		type: Number,
		required: true
	},
	createdById: {
		type: Number,
		required: true
	},
	creationDate: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model("ChatKey", chatKeySchema);
