const Logs = require('../actions/logs');

module.exports = class Mentions {
    static action(message) {
        let fs = require('fs');
        let moment = require('moment');
        let path = process.env["ACTION_PATH"];
        let file = path + '/' + 'mentions' + '.json';

        let obj = {};

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        obj = JSON.parse(data);

                        const randomResp = obj[Math.floor(Math.random() * obj.length)];

                        lastMessage = moment();
                        messageCounter++;

                        message.channel.send(randomResp);
                        Logs.snap('[Mentions] : ' + randomResp);
                    }
                });
            } else {
                Logs.snap('[404]FNF : ' + file);
            }
        });
    }
};