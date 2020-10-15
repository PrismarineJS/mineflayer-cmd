import { Bot } from 'mineflayer';
import { CommandManager } from './CommandManager';
import { startConsoleInput } from './ConsoleInput';

export function plugin(bot: Bot): void
{
    // @ts-ignore
    bot.cmd = new CommandManager()

    // @ts-ignore
    if (plugin.allowConsoleInput)
        startConsoleInput(bot)

    // @ts-ignore
    setTimeout(() => bot.emit('cmd_ready'), 0)
}