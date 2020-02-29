const Logs = require('../actions/logs');

module.exports = class Random {
    static action(message) {
        let chances = 1000;
        let random = Math.floor(Math.random() * chances);

        if(random !== 0) {
            return false;
        }

        let fs = require('fs');
        let path = process.env.ACTION_PATH;
        let file = path + '/' + 'random' + '.json';

        let obj = {};

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        obj = JSON.parse(data);

                        let randomRespRaw = obj[Math.floor(Math.random() * obj.length)];

                        let response = randomRespRaw.replace('<user>', message.author.username);
                        response = response.replace('<message>', message.toString().toUpperCase());

                        message.channel.send(response);
                        Logs.snap('[Random] : ' + response);
                    }
                });
            } else {
                Logs.snap('[404]FNF : ' + file);
            }
        });
    }
};