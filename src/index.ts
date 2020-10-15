import { Bot } from 'mineflayer';
import { CommandManager } from './CommandManager';

export function plugin(bot: Bot): void
{
    // @ts-ignore
    bot.cmd = new CommandManager()

    // @ts-ignore
    setTimeout(() => bot.emit('cmd_ready'), 0)
}