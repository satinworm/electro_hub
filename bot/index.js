const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const TELEGRAM_BOT_TOKEN = "7151776562:AAGwofman0FPisiw_3mM8ogcQQOM-toiqm0";

const adminIds = ["301286678"];
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

function escape(text) {
	return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

const app = express();
app.use(cors());
app.use(express.json());
const port = 3109;
let i = 1;


async function sendCarConfiguration(data, idx) {
	console.log("data", data);
	const {
		model,
		additional_options,
		wheels,
		interior_color,
		body,
		name,
		number,
	} = data;

	// Собираем основное описание модели
	let messageText = `*Обратная связь №${idx}*\n\n*Имя*: ${escape(name)}\n${
		number === "" ? "" : `*Телефон*: ${escape(number)}`
	}\n\n*Конфигурация автомобиля №${idx}*\n\n`;
	messageText += `*Модель*: ${escape(model.name)}\n*Базовая цена*: $${
		model.price
	}\n\n`;
	console.log("messageText", messageText);

	// Дополнительные опции
	messageText += `*Дополнительные опции:*\n`;
	for (const option in additional_options) {
		const opt = additional_options[option];
		messageText += `*${escape(opt.name)}*: ${escape("+")}${opt.price}$\n`;
	}

	// Колеса, цвет интерьера и кузова
	wheels?.name
		? (messageText += `\n*Колеса*: ${escape(wheels.name)} ${escape("+")}${
				wheels.price
		  }$\n`)
		: null;
	interior_color?.name
		? (messageText += `*Цвет интерьера*: ${escape(
				interior_color.name
		  )} ${escape("+")}${interior_color.price}$\n`)
		: null;
	body?.name
		? (messageText += `*Цвет кузова*: ${escape(body.name)} ${escape("+")}${
				body.price
		  }$\n`)
		: null;

	// Отправка сообщения через Telegram bot
	for (const adminId of adminIds) {
		try {
			await bot.sendMessage(adminId, messageText, { parse_mode: "MarkdownV2" });
		} catch (e) {
			console.log(e?.message || "telegram error");
		}
	}
}

async function sendFeedback(name, number, idx) {
	for (const adminId of adminIds) {
		try {
			await bot.sendMessage(
				adminId,
				`*Обратная связь №${idx}*\n\n*Имя*: ${escape(name)}\n${
					number === "" ? "" : `*Телефон*: ${escape(number)}`
				}\n`,
				{
					parse_mode: "MarkdownV2",
				}
			);
		} catch (e) {
			console.log(e?.message || "telegram error");
		}
	}
}
async function sendStockAlert(name, number, link, idx) {
	console.log("link ", link);
	const messageText = `*Новая заявка №${idx}*\n\n*Обратная связь*\n\n*Имя*: ${escape(
		name
	)}\n${
		number === "" ? "" : `*Телефон*: ${escape(number)}`
	}\n*Страница*: ${escape(link)}`;

	for (const adminId of adminIds) {
		try {
			await bot.sendMessage(adminId, messageText, {
				parse_mode: "MarkdownV2",
			});
		} catch (e) {
			console.log(e?.message || "telegram error");
		}
	}
}
app.post("/applications", async (req, res) => {
	const { data } = req.body;
	console.log("req.body", req.body);

	if (data?.type === "constructor") {
		// Это заявка на товар
		try {
			sendCarConfiguration(data, i++);
			res.status(201).end();
		} catch (error) {
			console.log(error);
			res.status(400).end();
		}
	} else if (data.name && data.number && data.type === "feedback") {
		// Это обратная связь
		try {
			await sendFeedback(data.name, data.number, i++);
			res.status(201).end();
		} catch (error) {
			console.log(error);
			res.status(400).end();
		}
	} else if (data && data.type === "stock") {
		// Это сообщение с акцией
		try {
			await sendStockAlert(data.name, data.number, data.text, i++);
			res.status(201).end();
		} catch (error) {
			console.log(error);
			res.status(400).end();
		}
	} else {
		res.status(400).end("Invalid request");
	}
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
