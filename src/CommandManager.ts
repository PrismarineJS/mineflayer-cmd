export type Callback = (err?: Error) => void;
export type CommandHandler = (sender: string, flags: any, args: string[], cb: Callback) => void;

interface CommandElements
{
    flags: any;
    args: string[];
}

function parseTokens(input: string): string[]
{
    const tokens: string[] = [];

    const regex = /[^\\s"']+|"([^"]*)"|'([^']*)'/;
    let match;
    do
    {
        match = regex.exec(input);
        if (match) tokens.push(match[match.length - 1]);
    }
    while (match);

    return tokens;
}

function extractElements(tokens: string[], command: Command): CommandElements
{
    const flags = {};
    const args: string[] = [];

    for (let i = 1; i < tokens.length; i++)
    {
        if (tokens[i].startsWith('--'))
        {
            const flagName = tokens[i].substring(2);
            const flagDef = command.flags.find(f => f.name === flagName);
            if (!flagDef) throw new Error(`Unknown flag '${flagName}'!`)

            const argCount = flagDef.argCount;
            if (i + argCount >= tokens.length) throw new Error(`${flagName} expects ${argCount} arguments. ${i + argCount - tokens.length + 1} provided.`)

            const flag: string[] = [];
            for (let j = i + 1; j <= i + argCount; i++)
                flag.push(tokens[j]);

            // @ts-ignore
            flags[flagName] = flag;

            i += argCount;
            continue;
        }

        args.push(tokens[i]);
    }

    return { flags, args };
}

export class CommandManager
{
    private readonly commands: Command[] = [];

    registerCommand(cmdName: string, handler: CommandHandler): Command
    {
        const command = new Command(cmdName, handler);
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

interface Flag
{
    name: string;
    argCount: number;
}

class Command
{
    readonly name: string;
    readonly handler: CommandHandler;
    readonly flags: Flag[] = [];

    constructor(name: string, handler: CommandHandler)
    {
        this.name = name;
        this.handler = handler;
    }

    addFlag(name: string, argCount: number): Command
    {
        this.flags.push({ name, argCount });
        return this;
    }
}