const Command = require('./command');
const Logs = require('../actions/logs');
const { fail } = require('assert');

const CONST_TERRO = 'terro';
const CONST_CT = 'ct';
const CONST_BOTH = 'both';

module.exports = class StratCs extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'stratcs');
    }

    static action(message) {
        
        let args = message.content.split(' ')[1];
        let team = CONST_BOTH;

        if(args == 'ct'){
            team = CONST_CT;
        } else if(args == 'terro' || args == 't') {
            team = CONST_TERRO;
        } else {
            team = CONST_BOTH;
        }

        let fs = require('fs');
        let path = process.env["ACTION_PATH"];
        let file = path + '/strats/' + 'cs' + '.json';

        let obj = {};

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        obj = JSON.parse(data);

                        let randomStrat = undefined;

                        if(team == CONST_CT) {
                            randomStrat = obj.ct[Math.floor(Math.random() * obj.ct.length)];
                        } else if(team == CONST_TERRO) {
                            randomStrat = obj.terro[Math.floor(Math.random() * obj.terro.length)];
                        } else if(team == CONST_BOTH) {
                            randomStrat = obj.both[Math.floor(Math.random() * obj.both.length)];
                        }

                        message.channel.send(
                            {embed:
                                {
                                    color: process.env["EMBED_COLOR"],
                                    description: "**Voici la stratégie à appliquer :**",
                                    fields: [{
                                        name: randomStrat.title,
                                        value: randomStrat.strat
                                      }
                                    ]
                                }
                            });

                        
                        Logs.snap('[Strat CS] : ask for strat :' +randomStrat.title);
                    }
                });
            } else {
                Logs.snap('[404]FNF : ' + file);
            }
        });

        return false;
    }
};