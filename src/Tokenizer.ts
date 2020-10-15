import { Command } from './Command';

interface CommandElements
{
    flags: any;
    args: string[];
}

export function parseTokens(input: string): string[]
{
    const tokens: string[] = [];

    const regex = /([^\s"']+)|"([^"]*)"|'([^']*)'/g;
    let match;

    do
    {
        match = regex.exec(input);
        if (match) tokens.push(match[3] || match[2] || match[1]);
    }
    while (match);

    return tokens;
}

export function extractElements(tokens: string[], command: Command): CommandElements
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
            for (let j = i + 1; j <= i + argCount; j++)
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
