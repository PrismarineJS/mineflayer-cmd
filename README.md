### 1.2.0
* [Add repo commands workflow (#77)](https://github.com/PrismarineJS/mineflayer-cmd/commit/a7897c42b71a718d70eec4000e6228a01fcc7fd9) (thanks @rom1504)
* [Update CI to Node 24 (#76)](https://github.com/PrismarineJS/mineflayer-cmd/commit/e6c426607f2e8e928a4c01d06ddd8aed5baedb61) (thanks @rom1504)
* [Bump typescript from 4.9.5 to 5.0.4 (#42)](https://github.com/PrismarineJS/mineflayer-cmd/commit/9633986562043171eb7fc63641c463d7ee21bb9b) (thanks @dependabot[bot])
* [Bump @types/node from 18.16.13 to 20.2.1 (#52)](https://github.com/PrismarineJS/mineflayer-cmd/commit/69a13a47727f6666d141de760f274a1d1531f4bc) (thanks @dependabot[bot])
* [Bump @types/node from 17.0.45 to 18.6.4 (#39)](https://github.com/PrismarineJS/mineflayer-cmd/commit/94c68de96b2b114d07e0fb67074d8aeba6b478a6) (thanks @dependabot[bot])
* [Bump mineflayer from 3.18.0 to 4.0.0 (#30)](https://github.com/PrismarineJS/mineflayer-cmd/commit/5c92f45bd49e132beb1c44de7f42f75c44c2ff54) (thanks @dependabot[bot])
* [Bump @types/node from 16.11.17 to 17.0.4 (#29)](https://github.com/PrismarineJS/mineflayer-cmd/commit/795960413dcf3153049c456a67df4bfda0fc9722) (thanks @dependabot[bot])
* [Bump @types/node from 15.14.1 to 16.0.0 (#24)](https://github.com/PrismarineJS/mineflayer-cmd/commit/02dc8cc1c25ad56e85efe0f65cf4bb5b5eb26f59) (thanks @dependabot[bot])
* [Bump @types/node from 14.14.43 to 15.0.1 (#22)](https://github.com/PrismarineJS/mineflayer-cmd/commit/79ea0bd851c52bf1d5330214c045a49c0e98931d) (thanks @dependabot-preview[bot])
* [Upgrade to GitHub-native Dependabot (#23)](https://github.com/PrismarineJS/mineflayer-cmd/commit/a4ec91cdd63d4584d9caafb6944662578e762197) (thanks @dependabot-preview[bot])
* [Merge pull request #19 from u9g/patch-1](https://github.com/PrismarineJS/mineflayer-cmd/commit/38c7b925e05681f18692bb2a9a876d0b7da8abfb) (thanks @TheDudeFromCI)
* [accidentally imported a package](https://github.com/PrismarineJS/mineflayer-cmd/commit/499771ffce551540ad4795925100c27c77e40cef) (thanks @u9g)
* [Merge pull request #16 from PrismarineJS/dependabot/npm_and_yarn/mineflayer-3.0.0](https://github.com/PrismarineJS/mineflayer-cmd/commit/23b6e39745c345207f76d4674384d0f532cf1c05) (thanks @TheDudeFromCI)
* [promisify](https://github.com/PrismarineJS/mineflayer-cmd/commit/1be3c484295b3ccf44e8e696720587d37ede70d9) (thanks @u9g)
* [make commandmanager async](https://github.com/PrismarineJS/mineflayer-cmd/commit/13f1668daa9b23ccb194f237a03f58420c7d0ad9) (thanks @u9g)
* [fix readme](https://github.com/PrismarineJS/mineflayer-cmd/commit/76396b6590c52313f1a1c6c596d76d11543e9752) (thanks @u9g)
* [lint with standard + add promises/async](https://github.com/PrismarineJS/mineflayer-cmd/commit/ffe199d262e30f99aff267458b293f61221cc29c) (thanks @u9g)
* [Bump mineflayer from 2.41.0 to 3.0.0](https://github.com/PrismarineJS/mineflayer-cmd/commit/ad10f2871cc43c4cdc13cce1349b2cf1cfa09909) (thanks @dependabot-preview[bot])

<h1 align="center">mineflayer-cmd</h1>
<p align="center"><i>A simple command manager and handler for Mineflayer plugins.</i></p>

<p align="center">
  <img src="https://github.com/TheDudeFromCI/mineflayer-cmd/workflows/Build/badge.svg" />
  <img src="https://img.shields.io/npm/v/mineflayer-cmd" />
  <img src="https://img.shields.io/github/repo-size/TheDudeFromCI/mineflayer-cmd" />
  <img src="https://img.shields.io/npm/dm/mineflayer-cmd" />
  <img src="https://img.shields.io/github/contributors/TheDudeFromCI/mineflayer-cmd" />
  <img src="https://img.shields.io/github/license/TheDudeFromCI/mineflayer-cmd" />
</p>

---

### Getting Started

This plugin is built using Node and can be installed using:
```bash
npm install --save mineflayer-cmd
```

### Simple Bot

Loading the plugin can be done the same as any other plugin. Commands can also be loaded at any time.

```js
// Create your bot
const mineflayer = require("mineflayer");
const bot = mineflayer.createBot({ username: "Player" });

// Load the cmd plugin
const cmd = require('mineflayer-cmd').plugin

cmd.allowConsoleInput = true // Optional config argument
bot.loadPlugin(cmd)

// Register your custom command handlers, if desired (plugins can load them too)
function sayCommand(sender, flags, args): Promise<void> {
  return new Promise((resolve, reject) => {
    let message = ''

    if (flags.showsender) message += sender + ": "
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
```

### Documentation

[API](https://github.com/TheDudeFromCI/mineflayer-cmd/blob/master/docs/api.md)

[Examples](https://github.com/TheDudeFromCI/mineflayer-cmd/tree/master/examples)

### License

This project uses the [MIT](https://github.com/TheDudeFromCI/mineflayer-cmd/blob/master/LICENSE) license.

### Contributions

This project is accepting PRs and Issues. See something you think can be improved? Go for it! Any and all help is highly appreciated!

For larger changes, it is recommended to discuss these changes in the issues tab before writing any code. It's also preferred to make many smaller PRs than one large one, where applicable.
