import path from 'path'
import {TextLintEngine} from 'textlint'

export default function(controller) {

  const engine = new TextLintEngine({
    configFile: path.join(__dirname, '../.textlintrc'),
  })

  const formatResults = (results) => {
    let output = '```\n'
    const messages = results[0].messages
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      const msgText = `${msg.line}行目：${msg.message}\n`
      output += msgText
    }
    output += '```'

    return output
  }

  controller.hears([/^check[\n\r]([\s\S]*)/], ['direct_message'], (bot, message) => {
    const msgBody = message.match[1]

    engine.executeOnText(msgBody).then(results => {
      if (! engine.isErrorResults(results)) {
        bot.reply(message, 'エラーは見つかりませんでした。')
        return
      }

      let output = ''
      output += 'エラーが見つかりました。\n\n'
      output += formatResults(results)

      bot.reply(message, output)
    })
  })

}
