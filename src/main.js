import Botkit from 'botkit'

// Botkit
const controller = Botkit.slackbot({
  debug: false
})
controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM()

controller.hears(['ping', 'PING'], ['direct_mention', 'mention'], (bot, message) => {
  bot.reply(message, 'pong')
})

