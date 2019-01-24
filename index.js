/*
 *
 * GONZALO IVÁN CHAPARRO BARESE
 * 2ºDAW - IES CAMPANILLAS
 * 
 */

// Import Telegram Bot Stuff
const TelegramBot = require('node-telegram-bot-api'                    );
const config      = require('./config'                                 );

const buffer = new Buffer(config.token, 'base64'                       );
const token  = buffer.toString();
const bot    = new TelegramBot(token, {polling: true}                  );

// Import Songs
const Priceless = require('./Songs/Priceless/Priceless'                );
const Glitch    = require('./Songs/Glitch/Glitch'                      );
const Synchronous = require('./Songs/Synchronous/Synchronous'          );
const Creep = require('./Songs/Creep/Creep'                            );
const ToTheOtherSide = require('./Songs/ToTheOtherSide/ToTheOtherSide' );
const Trying = require('./Songs/Trying/Trying'                         );
const AbsoluteZero = require('./Songs/AbsoluteZero/AbsoluteZero'       );
const Abducted = require('./Songs/Abducted/Abducted'                   );

var canciones = [];
canciones.push(Priceless, Glitch, Synchronous, Creep, ToTheOtherSide, Trying, AbsoluteZero, Abducted);

// Import Commands
const Commands = require('./Commands/Commands');
const comandos = Commands;

// STICKER FOTO DE PERFIL
const perfilSticker = "CAADBAADCQADV5QjHkDqPm6U_sGhAg";

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
  const chatId = msg.chat.id;
  const textoRecibido = msg.text;

  console.log("Mensaje: " + textoRecibido)

  switch (textoRecibido) {
    case '/start':
    bot.sendSticker(chatId, perfilSticker).then(() => {
      bot.sendMessage(chatId,
        '¡Hola, bienvenido al Bot de xLoxLoLex(@MrHighway98).\n\nEscribe "/comandos" para obtener una lista de comandos útiles.');
    });
    break;

    case '/comandos':

      bot.sendMessage(chatId, 'Encantado de ayudarte, aquí tienes una lista de los comandos disponibles: ').then(() => {
        var msg = '';
        for (var i =  0; i < comandos.length; i++) {
          msg += comandos[i].comando + '\n' + comandos[i].descripcion + '\n\n';
        }
        bot.sendMessage(chatId, msg).then(() => {});
      });

    break;

    case '/getSong':

      bot.sendMessage(chatId, 'Aquí tienes una canción aleatoria de xLoxLoLex: ').then(() => {
        var r = Math.floor(Math.random() * 7);
        bot.sendMessage(chatId, videos[r].nombre).then(() => {
          bot.sendMessage(chatId, videos[r].url).then(() => {
            bot.sendSticker(chatId, canciones[r].stickerID);
          });
        });
      });
    break;

    default:
      bot.sendMessage(chatId, 'Lo siento, no entiendo qué quieres decirme.\nUsa el comando "/comandos" para obtener una lista de comandos útiles.');
    break;
  }
});