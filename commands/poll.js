const Command = require('./command');
const Logs = require('../actions/logs');

const emojiArrayNumber = [
    "0️⃣",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟"
];

const emojiArrayBool = [
    "👍",
    "👎"
];

module.exports = class Poll extends Command {
    
    static match(message) {
        return message.content.startsWith(process.env["BOT_PREFIX"] + 'poll');
    }

    static action(message) {
        
        let regex = '\"(.*?)\"';
        let pollArray = [...message.content.matchAll(regex)];

        if (pollArray === undefined || pollArray.length == 0) {
            //Help

            this.notWorking(message);
            return false;

        } else if (pollArray.length == 1) {

            //Bool poll
            let pollQuestion = pollArray[0][1];
            this.booleanPoll(message, pollQuestion);
            return false;

        } else if (pollArray.length == 2) {
            // Fail poll

            this.notWorking(message, true);
            return false;

        } else if (pollArray.length >= 3) {

            //Multi poll
            let pollAnswers = [];
            
            let pollQuestion = pollArray[0][1];

            for(let i=1; i<=emojiArrayNumber.length;i++) {
                if(pollArray[i] !== undefined) {
                    let answer = emojiArrayNumber[i] + " " + pollArray[i][1];
                    pollAnswers.push(answer);
                } else {
                    break;
                }
            }

            this.multiplePoll(message,pollQuestion,pollAnswers)
            return false;

        }
    }

    static booleanPoll(message, question) {

        message.channel.send(
            {embed:
                {
                    color: process.env["EMBED_COLOR"],
                    description: '**'+question+'**',
                    footer: {
                        text: "Sondage lancé par "+message.author.username
                      }
                }
            })
            .then(function (message) {
                emojiArrayBool.forEach(element => {
                    message.react(element);
                });
            });

        message.delete()
        
        Logs.snap('[Poll] : Yes/No poll created');
        
    }

    static multiplePoll(message, question, answers) {
        let formatedAnswers = '';

        answers.forEach(answer => {
            formatedAnswers += answer + '\n';
        });

        message.channel.send(
            {embed:
                {
                    color: process.env["EMBED_COLOR"],
                    description: '**'+question+'**',
                    fields: [{
                        name: "Choix possibles :",
                        value: formatedAnswers
                      }
                    ],
                    footer: {
                        text: "Sondage lancé par "+message.author.username
                      }
                }
            })
            .then(function (message) {
                for(let i=0; i<=answers.length;i++) {
                    if(answers[i] !== undefined) {
                        message.react(emojiArrayNumber[i+1]);
                    } else {
                        break;
                    }
                }
            });

        message.delete()
        
        Logs.snap('[Poll] : Multi answers poll created');
    }

    static notWorking(message, isFail = false) {

        let logMessage = 'Help poll';
        let failMessage = '**Voilà comment créer un sondage :**';
        if(isFail) {
            logMessage = 'Fail poll'
            failMessage = '**C\'est pas comme ça que je fonctionne...**'
        }

        message.channel.send(
            {embed:
                {
                    color: process.env["EMBED_COLOR"],
                    description: failMessage,
                    fields: [{
                        name: "Question Oui/Non :",
                        value: process.env["BOT_PREFIX"]+'poll "Les robots vont-il prendre le contrôle de la Terre ?"'
                      },
                      {
                        name: "Question à plusieurs choix (2 choix minimum, 10 choix maximum.) :",
                        value: process.env["BOT_PREFIX"]+'poll "Comment l\'humanité va-t-elle disparaitre ?" "Une guerre" "Un virus" "Une armée de robots"'
                      }
                    ]
                }
            });

        message.delete()
        
        
        Logs.snap('[Poll] : '+logMessage);
    }
};