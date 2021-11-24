const express = require("express");
const router = express.Router();
const logger = require("loglevel").getLogger("logger");
const axios = require("axios");
const { getChatKey } = require("../services/chatKeyService");

const { TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

router.post("/", async (req, res) => {
	const { chatKey, message } = req.body;

	const chat = await getChatKey(chatKey);
	if (!chat) {
		return res.sendStatus(404);
	}
	try {
		await axios.post(`${TELEGRAM_API}/sendMessage`, {
			chat_id: chat.chatId,
			text: message,
			parse_mode: "HTML"
		});
		return res.status(200).send({ ok: true });
	} catch (err) {
		logger.error("Error sending a message: ", err);
		return res.sendStatus(500);
	}
});

module.exports = router;
