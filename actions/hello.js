const Logs = require('../actions/logs');

module.exports = class Answers {
    static action(json, message) {
        let msgLow = message.toString().toLowerCase();

        let triggers = json['triggers'];
        let answers = json['answers'];

        let isMatch = false;

        triggers.find(trigger => {
            let regex = new RegExp(`(^|\\\s)${trigger}($|\\\s)`, 'gi');
            if(msgLow.match(regex)) {
                isMatch = true;
            }
        });

        if (isMatch) {
            let answer = answers[Math.floor(Math.random() * answers.length)];

            message.channel.send(answer);
            Logs.snap('[Hello] : ' + answer);

            return false;
        }
    }
};