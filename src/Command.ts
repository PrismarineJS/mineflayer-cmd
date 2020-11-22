import { CommandHandler } from "./CommandManager";

export class Command
{
    readonly name: string;
    readonly handler: CommandHandler;
    readonly help: string = "";
    readonly flags: Flag[] = [];

    constructor(name: string, handler: CommandHandler, help: string)
    {
        this.name = name;
        this.handler = handler;
        this.help = help;
    }

    addFlag(name: string, argCount: number): Command
    {
        this.flags.push({ name, argCount });
        return this;
    }
}

interface Flag
{
    name: string;
    argCount: number;
}
