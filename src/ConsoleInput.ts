import { Bot } from 'mineflayer';
import * as readline from 'readline';

export function startConsoleInput(bot: Bot)
{
    bot.once('login', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('line', (input) => {
            // @ts-ignore
            bot.cmd.run('[CONSOLE]', input, (err) => {
                if (!err) return

                // @ts-ignore
                bot.cmd.log('[CONSOLE]', err.message)
            })
        });
        
        bot.once('end', () => rl.close())
    });
}
