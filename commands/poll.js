const Command = require('./command');
const Logs = require('../actions/logs');

module.exports = class Poll extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'poll');
    }

    static action(message) {
        
        

        Logs.snap('[Poll] : poll created');
    }
};