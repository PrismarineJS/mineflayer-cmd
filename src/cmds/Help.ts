import { Command } from "../Command";
import { CommandManager } from "../CommandManager"

export default function(cmdManager: CommandManager) {

    async function helpCommand(sender: string, _flags: any, args: string[]): Promise<void> {
     return new Promise((resolve, reject) => {
            const log = (msg: string) => cmdManager.log(sender, msg);

            function listHelpFor(cmd: Command) {
                log(`${cmd.name} - ${cmd.help}`);
                log(`  Usage: ${cmd.usage}`)

                if (cmd.flags.length > 0) {
                    log(`  Flags:`)
                    for (const flag of cmd.flags) {
                        log(`  ${flag.usage}`);
                    }
                }
            }

            function listAllCommands() {
                log('Available Commands:');
                for (const cmd of cmdManager.commands) {
                    listHelpFor(cmd);
                }
            }
        
            if (args.length === 0) {
                listAllCommands();
            } else if (args.length === 1) {
                const cmdName = args[0].toLowerCase();
                const cmd = cmdManager.commands.find(c => c.name.toLowerCase() === cmdName);

                if (cmd == null) {
                    log(`Command '${args[0]}' not found!`);
                } else {
                    listHelpFor(cmd);
                }
            } else {
                log('Usage: help [command name]');
            }

            resolve()
        })
    }

    cmdManager.registerCommand('help', helpCommand,
        'Lists a description and usage information for all commands.',
        'help [command name]');
}
