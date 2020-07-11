const Command = require('./command');
const Logs = require('../actions/logs');

module.exports = class Roll extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'roll');
    }

    static action(message) {

        let roll = message.toString().split(' ')[1];

        if (typeof roll === 'undefined') {
            return false;
        }

        let re = new RegExp(/^1?(?:[0-9]{2}|[1-9])d1?(?:[0-9]{2}|[1-9])$/);
        if (re.test(roll)) {
            let nbdice = roll.split('d')[0];
            let diceof = roll.split('d')[1];

            if (nbdice > 100 || nbdice < 1) {
                message.channel.send('Nombre de dés invalide.');
                return false;
            }
            if (diceof > 100 || diceof < 1) {
                message.channel.send('Nombre de faces invalide.');
                return false;
            }

            let response = '```';

            Logs.snap('[Roll] : Public Roll : ' + roll);

            let nbitems = 5;
            let counter = 0;

            for (let row = 0; row < nbdice; row += nbitems) {
                let line = '';
                for (let i = row; i < (row + nbitems); i++) {
                    if (counter === parseInt(nbdice, 10)) {
                        break;
                    }
                    let result = Math.floor(Math.random() * diceof) + 1;

                    Logs.snap('[Roll] ' + result);

                    let space = '';
                    if(result < 10) {
                        space = '    ';
                    } else if(result < 100) {
                        space = '   ';
                    } else {
                        space = '  ';
                    }

                    line = line + '🎲 : ' + result + space;
                    counter++;
                }
                response = response + '\n' + line;
            }
            response = response + '```';

            message.channel.send(response);
        }
    }
};