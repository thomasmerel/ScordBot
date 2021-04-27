const Command = require('./command');
const Logs = require('../actions/logs');
const { fail } = require('assert');

module.exports = class StratCs extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'say');
    }

    static action(message) {
        let sentence = message.contenta.substr(5);

        message.channel.send(sentence);
        message.delete()
        Logs.snap('[Poll] : ScordBot said : '+sentence);
    }
};