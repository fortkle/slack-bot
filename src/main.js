import Botkit from 'botkit'

import redis from './redis'
import lint from './lint'

// Botkit
const controller = Botkit.slackbot({
  debug: false,
  storage: redis()
})
controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM()

// Commands
lint(controller)

controller.hears(['ping', 'PING'], ['direct_mention', 'mention'], (bot, message) => {
  bot.reply(message, 'pong')
})

