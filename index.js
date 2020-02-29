require('dotenv').config({path: `.env`});

//Set
const Discord = require('discord.js');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const moment = require('moment');

//Init bot
const bot = new Discord.Client();

//Init logs
const Logs = require('./actions/logs');

//Commands
const Ping = require('./commands/ping');
const Pong = require('./commands/pong');
const Help = require('./commands/help');
const Sroll = require('./commands/sroll');
const Roll = require('./commands/roll');
const Add = require('./commands/add');
const Delete = require('./commands/delete');
const List = require('./commands/list');
const Default = require('./commands/setDefault');
const Sources = require('./commands/sources');

//Actions
const Mentions = require('./actions/mentions');
const Random = require('./actions/random');
const Wish = require('./actions/wish');
const Answers = require('./actions/answers');
const Hello = require('./actions/hello');

//Set prefix
let prefix = process.env.PREFIX;

//On start
bot.on('ready', function () {
    Logs.snap('bot start');
    bot.user.setActivity(prefix + 'help').catch();
    Wish.action(bot);
});

//On message
bot.on('message', function (message) {
    if (message.author.bot) {
        return false;
    }

    if (message.channel.type === 'dm' || message.channel.type === 'group') {
        return false;
    }

    if (message.isMentioned(bot.user)) {
        Mentions.action(message);
        return false;
    }

    if (message.content.lastIndexOf(prefix, 0) === 0) {
        let commandUsed =
            Ping.parse(message) ||
            Pong.parse(message) ||
            Add.parse(message) ||
            Delete.parse(message) ||
            List.parse(message) ||
            Default.parse(message) ||
            Sources.parse(message) ||
            Roll.parse(message) ||
            Sroll.parse(message) ||
            Help.parse(message);

        return false;
    }

    //Hello
    let path = process.env.ACTION_PATH;
    let fileHello = path + '/' + 'hello' + '.json';

    fs.exists(fileHello, function (exists) {
        if (exists) {
            fs.readFile(fileHello, function readFileCallback(err, data) {
                if (err) {
                    Logs.snap(err)
                } else {
                    let json = JSON.parse(data);
                    Hello.action(json, message);
                    return false;
                }
            });
        } else {
            Logs.snap('[404]FNF : ' + fileHello);
        }
    });

    //Answers
    let fileAnswers = path + '/' + 'answers' + '.json';

    fs.exists(fileAnswers, function (exists) {
        if (exists) {
            fs.readFile(fileAnswers, function readFileCallback(err, data) {
                if (err) {
                    Logs.snap(err)
                } else {
                    let json = JSON.parse(data);
                    Answers.action(json, message);
                    return false;
                }
            });
        } else {
            Logs.snap('[404]FNF : ' + fileAnswers);
        }
    });

    Random.action(message);
});

//On error
bot.on('error', console.error);

//Cron tabs
new CronJob('0 0 7 * * *', function () {
    Wish.action(bot);
}, null, true, 'Europe/Paris');

bot.login(process.env.TOKEN);