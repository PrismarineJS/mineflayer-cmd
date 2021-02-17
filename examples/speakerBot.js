if (process.argv.length < 4 || process.argv.length > 6) {
  console.log('Usage : node speakerBot.js <host> <port> [<name>] [<password>]')
  process.exit(1)
}

// Create your bot
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: process.argv[2],
  port: process.argv[3],
  username: process.argv[4] || 'cmd_Bot',
  password: process.argv[5]
})

// Load the cmd plugin
const cmd = require('mineflayer-cmd').plugin

cmd.allowConsoleInput = true // Optional config argument
bot.loadPlugin(cmd)

// Register your custom command handlers, if desired (plugins can load them too)
function sayCommand (sender, flags, args) {
  return new Promise((resolve, reject) => {
    let message = ''

    if (flags.showsender) message += sender + ': '
    if (flags.color) message += '&' + flags.color[0]

    message += args.join(' ')
    bot.chat(message)
    resolve()
  })
}

bot.once('cmd_ready', () => {
  bot.cmd.registerCommand('say', sayCommand, // Create a new command called 'say' and set the executor function
    'make me say something', // help text
    'say <message>') // usage text

  // Add a flag called 'color' that expects 1 input
    .addFlag('color', 1, ['color code'], 'Changes the chat color')

  // Add a flag called 'showsender' that expects 0 inputs
    .addFlag('showsender', 0, [], 'If present, displays the sender who sent this message')
})

// And listen for command inputs from any source
// Let's listen for chat events that start with "!"
bot.on('chat', (username, message) => {
  if (message.startsWith('!')) {
    const command = message.substring(1)
    bot.cmd.run(username, command) // Run with the sender and the command itself
  }
})
