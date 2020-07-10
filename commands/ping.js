const Command = require('./command');
const Logs = require('../actions/logs');

module.exports = class Ping extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'ping');
    }

    static action(message) {
        message.channel.send('Pong! :ping_pong:');
        Logs.snap('[Ping] : pong!');
    }
};