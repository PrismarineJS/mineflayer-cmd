import { Bot } from 'mineflayer';
import { Command } from './Command';
import { parseTokens, extractElements } from './Tokenizer';

export type CommandHandler = (sender: string, flags: any, args: string[]) => void;
export type Logger = (sender: string, message: string) => void;

export class CommandManager
{
    readonly commands: Command[] = [];
    log: Logger;

    constructor (bot: Bot) {
        this.log = (sender, message) => {
            if (sender === '[CONSOLE]') console.log(message);
            else bot.chat(message);
        }
    }

    registerCommand(cmdName: string, handler: CommandHandler, help: string = "", usage: string = ""): Command
    {
        if (help === '' || usage === '') {
            console.warn(`[mineflayer-cmd] Note that leaving command description and usage information is not recommended. (Effected command: '${cmdName}')`);
        }

        const command = new Command(cmdName, handler, help, usage);
        this.commands.push(command);
        return command;
    }

    setLogger(logger: Logger): void {
        this.log = logger;
    }

    async run(sender: string, command: string): Promise<void>
    {
        const tokens = parseTokens(command);

        if (tokens.length === 0)
        {
            throw new Error("Cannot parse empty string!");
        }

        const cmd = this.commands.find(c => c.name === tokens[0]);

        if (!cmd)
        {
            throw new Error("Command not found!")
        }
        const { flags, args } = extractElements(tokens, cmd);
        return cmd.handler(sender, flags, args);
    }
}
