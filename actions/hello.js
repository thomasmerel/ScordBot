const Logs = require('../actions/logs');

module.exports = class Answers {
    static action(json, message) {
        let msgLow = message.toString().toLowerCase();

        let triggers = json['triggers'];
        let answers = json['answers'];

        const isMatch = triggers.some(trigger => msgLow.match((new RegExp(`^${trigger}($|\\\s)`, 'gi'))));

        if (isMatch) {
            let answer = answers[Math.floor(Math.random() * answers.length)];

            message.channel.send(answer);
            Logs.snap('[Hello] : ' + answer);

            return false;
        }
    }
};
