const TelegramBot = require('node-telegram-bot-api');

var config = require('./config');

var b = new Buffer(config.token, 'base64');
var token = b.toString();

const bot = new TelegramBot(token, {polling: true});

let videos = [
  { url: "https://www.youtube.com/watch?v=I9sFQuEPaz4", nombre: "Priceless"         },
  { url: "https://www.youtube.com/watch?v=zWmvNRa0K9Y", nombre: "Glitch"            },
  { url: "https://www.youtube.com/watch?v=x_ArO3ld_P0", nombre: "Synchronous"       },
  { url: "https://www.youtube.com/watch?v=n3GpDTzo3R8", nombre: "Creep"             },
  { url: "https://www.youtube.com/watch?v=GpTMhPLkxF4", nombre: "To The Other Side" },
  { url: "https://www.youtube.com/watch?v=fEQ6djqPBA0", nombre: "Trying"            },
  { url: "https://www.youtube.com/watch?v=V3iKxxcLv3A", nombre: "Absolute Zero"     },
  { url: "https://www.youtube.com/watch?v=0YG7osAPc1w", nombre: "Abducted"          }
];

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  console.log(msg)
  const chatId = msg.chat.id;
  const textoRecibido = msg.text;
  if (textoRecibido == "/getSong") {
    bot.sendMessage(chatId, 'Aquí tienes una canción aleatoria de xLoxLoLex: ').then(() => {
      var r = Math.floor(Math.random() * 7);
      bot.sendMessage(chatId, videos[r].nombre).then(() => {
        bot.sendMessage(chatId, videos[r].url);
      });
    });
  }
});