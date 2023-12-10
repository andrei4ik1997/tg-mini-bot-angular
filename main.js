import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";

const TOKEN = "6846153551:AAEDFZZi1Wj8XP4BiT2cz4JfPdh64x1e0TU";
const WEB_APP_URL = "https://angulartgapp-fef77.web.app";

const telegramBot = new Telegraf(TOKEN);

telegramBot.command("start", (context) => {
  context.reply(
    "Добро пожаловать! Нажмите на кнопку ниже, что бы запустить приложение",
    Markup.keyboard([
      Markup.button.webApp("Отправить сообщение", `${WEB_APP_URL}/feedback`),
    ])
  );
});

telegramBot.on(message("web_app_data"), async (ctx) => {
  const data = ctx.webAppData.data.json();
  ctx.reply(
    data?.feedback ? `Ваше сообщение:${data?.feedback}` : "empty message"
  );
});

telegramBot.launch();
