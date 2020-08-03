const Logs = require('../actions/logs');

module.exports = class Answers {
    static action(json, message) {

        let msgLow = message.toString().toLowerCase();
        let moment = require('moment');

        for (let [key, value] of Object.entries(json)) {
            if(msgLow.includes(key)) {
                lastMessage = moment();
                messageCounter++;

                let response = '';
                if(value.includes(' ; ')) {
                    let values = value.split(' ; ')
                    console.log(values)
                    response = values[Math.floor(Math.random() * values.length)];
                } else {
                    response = value;
                }

                message.channel.send(response);

                Logs.snap('[Answers] : ' + response);

                return false;
            }
        }
    }
};