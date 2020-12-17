import { Bot } from 'mineflayer';
import { CommandManager } from './CommandManager';
import { startConsoleInput } from './ConsoleInput';
import helpCmd from './cmds/Help';

export function plugin(bot: Bot): void
{
    const cmdManager = new CommandManager(bot);

    // @ts-ignore
    bot.cmd = cmdManager

    // @ts-ignore
    if (plugin.allowConsoleInput)
        startConsoleInput(bot)

    setTimeout(() => {
        helpCmd(cmdManager);

        // @ts-ignore
        bot.emit('cmd_ready')
    }, 0)
}