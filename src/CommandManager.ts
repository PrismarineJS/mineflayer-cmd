import { Command } from './Command';
import { parseTokens, extractElements } from './Tokenizer';

export type Callback = (err?: Error) => void;
export type CommandHandler = (sender: string, flags: any, args: string[], cb: Callback) => void;
export type Logger = (sender: string, message: string) => void;

export class CommandManager
{
    readonly commands: Command[] = [];

    log: Logger = (sender, message) => console.log(message);

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

    run(sender: string, command: string, cb: Callback = () => {}): void
    {
        const tokens = parseTokens(command);

        if (tokens.length === 0)
        {
            cb(new Error("Cannot parse empty string!"));
            return;
        }

        const cmd = this.commands.find(c => c.name === tokens[0]);

        if (!cmd)
        {
            cb(new Error("Command not found!"));
            return;
        }

        try
        {
            const { flags, args } = extractElements(tokens, cmd);
            cmd.handler(sender, flags, args, cb);
        }
        catch (err)
        {
            cb(err)
        }
    }
}
