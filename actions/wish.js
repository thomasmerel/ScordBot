const Logs = require('../actions/logs');

module.exports = class Wish {
    static action(bot) {
        Logs.snap('[Wish] start wish');

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

                                        let random = Math.random() * (100 - 1) + 1;

                                        Logs.snap('[Wish] wishing birhday : ' + user);

                                        if (random < 25) {
                                            defaultChan.send(
                                                "Hey " + user + " ! C'est pas ton anniversaire aujourd'hui ? Bon " +
                                                "anniversaire ! ça te fais quoi ? " + age + " ans ? 'tain t'es une vielle" +
                                                " personne maintenant !\n" +
                                                "https://media.giphy.com/media/3oEhn78T277GKAq6Gc/giphy.gif"
                                            );
                                        } else if (random > 25 && random < 50) {
                                            defaultChan.send(
                                                ":tada: :gift: Joyeux anniversaire à " + user + " ! C'est ses " + age +
                                                " ans aujourd'hui ! :gift: :tada:\n" +
                                                "https://media.giphy.com/media/3oKIPidnxHJQ3SuwwM/giphy.gif"
                                            );
                                        } else if (random > 50 && random < 75) {
                                            defaultChan.send(
                                                ":boom: Boom ! C'est l'anniversaire de " + user +
                                                " ! AH ! Tu l'as pas vu venir ! Fêtes lui ses " + age + " ! :clap:\n" +
                                                "https://media.giphy.com/media/kwSZzHYRwd4Lm/giphy.gif"
                                            );
                                        } else {
                                            defaultChan.send(
                                                "WOW ! ARRETEZ TOUT ! C'EST L'ANNIVERSAIRE DE " + user + " ! JOYEUX DE " +
                                                "PUTAIN DE " + age + " ANS !\n" +
                                                "https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif"
                                            );
                                        }
                                    }
                                } else {
                                    Logs.snap('[Wish] no birthday');
                                }
                            }
                        }
                    });
                }
            });
        })
    }
};