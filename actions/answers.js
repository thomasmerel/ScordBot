const Logs = require('../actions/logs');

module.exports = class Answers {
    static action(json, message) {

        let msgLow = message.toString().toLowerCase();
        let moment = require('moment');

        for (let [key, value] of Object.entries(json)) {
            if(msgLow.includes(key)) {
                lastMessage = moment();
                messageCounter++;
                message.channel.send(value);

                Logs.snap('[Answers] : ' + value);

                return false;
            }
        }
    }
};