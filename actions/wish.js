const Logs = require('../actions/logs');

module.exports = class Wish {
    static action(bot) {
        Logs.snap('[Wish] : start wish');

        let fs = require('fs');
        const moment = require('moment');

        let allguild = bot.guilds.array();

        allguild.forEach(function (guild) {

            let path = process.env["SERVER_PATH"];
            let file = path + '/' + guild.id + '.json';

            fs.exists(file, function (exists) {
                if (exists) {
                    fs.readFile(file, function readFileCallback(err, data) {
                        if (err) {
                        } else {
                            let obj = JSON.parse(data);

                            let today = moment();
                            let todayYear = today.year();
                            today.year(1970);

                            for (let key in obj.bdays) {

                                let bdate = moment(obj.bdays[key]);
                                let bdateYear = bdate.year();
                                bdate.year(1970);

                                if (today.isSame(bdate, 'd')) {
                                    let age = todayYear - bdateYear;

                                    let defaultChan = guild.channels.find(val => val.id === obj.default['channel']);
                                    let user = guild.members.find(val => val.id === key);

                                    if (defaultChan !== null) {

                                        let fs = require('fs');
                                        let path = process.env["ACTION_PATH"];
                                        let file = path + '/' + 'birthdays' + '.json';

                                        let obj = {};

                                        fs.exists(file, function (exists) {
                                            if (exists) {
                                                fs.readFile(file, function readFileCallback(err, data) {
                                                    if (err) {
                                                        console.error(err);
                                                    } else {
                                                        obj = JSON.parse(data);

                                                        let sentences = obj['sentences'];
                                                        let gifs = obj['gifs'];

                                                        let randomSentenceRaw = sentences[Math.floor(Math.random() * sentences.length)];
                                                        let randomGif = gifs[Math.floor(Math.random() * gifs.length)];

                                                        let randomSentenceWithUser = randomSentenceRaw.replace('<user>', user);
                                                        let randomSentenceWithVariables = randomSentenceWithUser.replace('<age>', age);
                                                        let finalSentence = randomSentenceWithVariables + randomGif;

                                                        defaultChan.send(finalSentence);
                                                        Logs.snap('[Wish birthday] : ' + finalSentence);
                                                    }
                                                });
                                            } else {
                                                Logs.snap('[404]FNF : ' + file);
                                            }
                                        });
                                    }
                                } else {
                                    Logs.snap('[Wish] : no birthday');
                                }
                            }
                        }
                    });
                }
            });
        })
    }
};