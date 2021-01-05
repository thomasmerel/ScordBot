const Command = require('./command');
const Logs = require('../actions/logs');
const { fail } = require('assert');

const CONST_TERRO = 'terro';
const CONST_CT = 'ct';
const CONST_BOTH = 'both';

module.exports = class StratCs extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'csgo');
    }

    static action(message) {
        let action = message.content.split(' ')[1];

        switch (action) {
            case 'strat':
                this.strat(message);
                break;
            default:
                Logs.snap('[CSGO] : not action set for "'+action+'"');
                break;
        }
    }

    static strat(message) {
        let args = message.content.split(' ')[2];
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
                        let messageDescr = '';

                        if(team == CONST_CT) {
                            console.log(obj.ct.length);
                            messageDescr = '**Voici la strat CT à appliquer :**';
                            randomStrat = obj.ct[Math.floor(Math.random() * obj.ct.length)];
                        } else if(team == CONST_TERRO) {
                            console.log(obj.terro.length);
                            messageDescr = '**Voici la strat Terro à appliquer :**';
                            randomStrat = obj.terro[Math.floor(Math.random() * obj.terro.length)];
                        } else if(team == CONST_BOTH) {
                            console.log(obj.both.length);
                            messageDescr = '**Voici la stratégie à appliquer :**';
                            randomStrat = obj.both[Math.floor(Math.random() * obj.both.length)];
                        }

                        message.channel.send(
                            {embed:
                                {
                                    color: process.env["EMBED_COLOR"],
                                    description: messageDescr,
                                    fields: [{
                                        name: randomStrat.title,
                                        value: randomStrat.strat
                                      }
                                    ]
                                }
                            });

                        
                        Logs.snap('[CSGO Strat] : ask for strat : ' +randomStrat.title);
                    }
                });
            } else {
                Logs.snap('[404]FNF : ' + file);
            }
        });

        return false;
    }
};