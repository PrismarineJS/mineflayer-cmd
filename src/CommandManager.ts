import { Command } from './Command';
import { parseTokens, extractElements } from './Tokenizer';

export type Callback = (err?: Error) => void;
export type CommandHandler = (sender: string, flags: any, args: string[], cb: Callback) => void;


export class CommandManager
{
    private readonly commands: Command[] = [];

    registerCommand(cmdName: string, handler: CommandHandler, help: string = ""): Command
    {
        const command = new Command(cmdName, handler, help);
        this.commands.push(command);
        return command;
    }

    run(sender: string, command: string, cb: Callback): void
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
