const Command = require('./command');
const Logs = require('../actions/logs');

module.exports = class Help extends Command {
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'help');
    }

    static action(message) {

        message.channel.send({embed:
            {
                color: process.env["EMBED_COLOR"],
                description: '**Voici les commandes qu vous pouvez utiliser :**',
                fields: [
                    {
                        name: process.env["BOT_PREFIX"]+'help',
                        value: 'Affiche ce message'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'add [' + process.env["DATE_FORMAT"] + ']',
                        value: 'Ajouter son anniversaire'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'delete',
                        value: 'Supprime la date lié a son pseudo'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'sources',
                        value: 'Donne un lien vers les sources du bot'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'setDefault',
                        value: 'Defini le channel où seront souhaité les anniversaires (Admin only)'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'roll XdY',
                        value: 'Lancer de dés (x=nb de dés ; y=nb de faces)'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'sroll XdY',
                        value: 'Lancer de dés secret (x=nb de dés ; y=nb de faces)'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'poll',
                        value: 'Affiche l\'aide pour les sondage'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'poll "lorem ipsum"',
                        value: 'Créer un sondage à choix simple (question fermée'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'poll "lorem ipsum" "dolor" "sit" "amet"',
                        value: 'Créer un sondage à choix multiple'
                    },
                    {
                        name: process.env["BOT_PREFIX"]+'ping',
                        value: 'Pong.'
                    },
                ]
            }
        });
        Logs.snap('[Help] : ask for help');
    }
};