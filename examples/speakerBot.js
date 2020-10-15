// Create your bot
const mineflayer = require("mineflayer");
const bot = mineflayer.createBot({
  host: process.argv[2],
  port: process.argv[3],
  username: process.argv[4] || 'cmd_Bot',
  password: process.argv[5],
});

// Load the cmd plugin
const cmd = require('mineflayer-cmd').plugin

cmd.allowConsoleInput = true // Optional config argument
bot.loadPlugin(cmd)

// Register your custom command handlers, if desired (plugins can load them too)
function sayCommand(sender, flags, args) {

  let message = ''

  if (flags.showsender) message += sender + ": "
  if (flags.color) message += '&' + flags.color[0]

  message += args.join(' ')
  bot.chat(message)
}

bot.once('cmd_ready', () => {
  bot.cmd.registerCommand('say', sayCommand) // Create a new command called 'say' and set the executor function
         .addFlag('color', 1) // Add a flag called 'color' that expects 1 input
         .addFlag('showsender', 0) // Add a flag called 'showsender' that expects 0 inputs
})

// And listen for command inputs from any source
// Let's listen for chat events that start with "!"
bot.on('chat', (username, message) => {
  if (message.startsWith('!')) {
    const command = message.substring(1)
    bot.cmd.run(username, command) // Run with the sender and the command itself
  }
})
