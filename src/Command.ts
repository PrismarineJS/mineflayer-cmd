import { CommandHandler } from "./CommandManager";

export class Command
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

interface Flag
{
    name: string;
    argCount: number;
}
