import { CommandHandler } from "./CommandManager";

export class Command
{
    readonly name: string;
    readonly handler: CommandHandler;
    readonly help: string;
    readonly flags: Flag[] = [];
    readonly usage: string;

    constructor(name: string, handler: CommandHandler, help: string, usage: string)
    {
        this.name = name;
        this.handler = handler;
        this.help = help;
        this.usage = usage;
    }

    addFlag(name: string, argCount: number, argNames: string[] = [], help: string = ''): Command
    {
        while (argNames.length < argCount)
            argNames.push('arg' + argNames.length);

        this.flags.push(new Flag(name, argCount, argNames, help));
        return this;
    }
}

class Flag
{
    readonly name: string;
    readonly argCount: number;
    readonly argNames: string[];
    readonly help: string;

    constructor(name: string, argCount: number, argNames: string[], help: string){
        this.name = name;
        this.argCount = argCount;
        this.argNames = argNames;
        this.help = help;
    }

    get usage() {
        let usage = `--${this.name}`

        for (let i = 0; i < this.argCount; i++)
            usage += ` <${this.argNames[i]}>`

        usage += ` - ${this.help}`
        return usage;
    }
}
