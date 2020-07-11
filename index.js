require('dotenv').config({path: `.env`});

// Load the http module to create an http server.
const http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("START HTTP SERVER\n");
});

// Last, but not least, listen on port 8080
// The environment variable PORT is automatically defined and equals to 8080
server.listen(process.env["PORT"], '0.0.0.0');

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
const Poll = require('./commands/poll');

//Actions
const Mentions = require('./actions/mentions');
const Random = require('./actions/random');
const Wish = require('./actions/wish');
const Answers = require('./actions/answers');
const Hello = require('./actions/hello');
const Stop = require('./actions/stop');

//Get env
let prefix = process.env["BOT_PREFIX"];
let dm = process.env["AUTHORIZED_DM"];  

global.messageCounter = 0;
global.lastMessage = moment();
let messageLimit = process.env["SPAM_LIMIT"];;
let timeLimit = process.env["SPAM_TIME"];
let limitReached = false;

//On start
bot.on('ready', function () {
    Logs.snap('[SYSTEM] : Start');
    bot.user.setActivity(prefix + 'help').catch();
    Wish.action(bot);
});

//On message
bot.on('message', function (message) {
    let now = moment();

    if (message.author.bot) {
        return false;
    }

    if (dm === 'FALSE') {
        if (message.channel.type === 'dm' || message.channel.type === 'group') {
            return false;
        }
    }

    if(now.diff(global.lastMessage) >= timeLimit) {
        messageCounter = 0;
        limitReached = false;
    } else {
        if(messageCounter >= messageLimit){
            limitReached = true;
        }
    }

    if (message.isMentioned(bot.user)) {
        if(!limitReached) {
            Mentions.action(message);
        } else {
            Stop.action(message);
        }
        return false;
    }

    if (message.content.lastIndexOf(prefix, 0) === 0) {
        if(!limitReached) {
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
                Poll.parse(message) ||
                Help.parse(message);
            
            lastMessage = moment();
            messageCounter++;
        } else {
            Stop.action(message);
        }
        return false;
    }

    //Hello
    let path = process.env["ACTION_PATH"];
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
                    if(!limitReached) {
                        Answers.action(json, message);
                    } else {
                        Stop.action(message);
                    }
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
bot.on('error', function (error) {
    Logs.snap('[ERROR] : ' + error);
});

//Cron tabs
new CronJob('0 0 7 * * *', function () {
    Wish.action(bot);
}, null, true, 'Europe/Paris');

bot.login(process.env["TOKEN"]);