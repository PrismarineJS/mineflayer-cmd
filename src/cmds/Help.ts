import { Command } from "../Command";
import { Callback, CommandManager } from "../CommandManager"

export default function(cmdManager: CommandManager) {

    function helpCommand(sender: string, flags: any, args: string[], cb: Callback) {
        const log = (msg: string) => cmdManager.log(sender, msg);

        function listHelpFor(cmd: Command) {
            log(`${cmd.name} - ${cmd.help}`);
            for (const flag of cmd.flags) {
                log(`  ${flag.usage}`);
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
            log('Usage: /help [command]');
        }

        cb();
    }

    cmdManager.registerCommand('help', helpCommand);
}