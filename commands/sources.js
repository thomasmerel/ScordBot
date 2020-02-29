const Command = require('./command');
const Logs = require('../actions/logs');

module.exports = class Sources extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'sources');
    }

    static action(message) {
        message.channel.send(":beer: Voici les sources du bot : https://github.com/thomasmerel/ScordBot");
        Logs.snap('[Sources] ask for sources');
    }
};