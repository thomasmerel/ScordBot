const Command = require('./command');
const Logs = require('../actions/logs');

module.exports = class Help extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'help');
    }

    static action(message) {
        message.channel.send('Voici les commandes qu vous pouvez utiliser :' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'help` => Affiche ce message' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'add [' + process.env["DATE_FORMAT"] + ']` => Ajouter son anniversaire' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'delete` => Supprime la date lié a son pseudo' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'sources` => Donne un lien vers les sources du bot' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'setDefault` => Defini le channel où seront souhaité les anniversaires (Admin only)' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'roll XdY` => Roll a dice (x=nb dice ; y=nb dice faces)' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'sroll XdY` => Roll a secret dice (x=nb dice ; y=nb dice faces)' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'poll` => Poll help' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'poll "lorem ipsum"` => Create a Yes/No poll' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'poll "lorem ipsum" "dolor" "sit" "amet"` => Create a multi answer poll' + '\n' +
            '`'+process.env["BOT_PREFIX"]+'ping` => Pong.'
        );
        Logs.snap('[Help] : ask for help');
    }
};