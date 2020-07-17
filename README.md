# ScordBot

Install the bot :
```sh
$ git clone git@github.com:thomasmerel/ScordBot.git
$ npm install
```

Launch the bot :
```sh
$ node index.js
```


ENV settings :
- `TOKEN` : Discord bot token.
- `BOT_PREFIX` : Command prefix.
- `SERVER_PATH` : Path where the .json servers files are located.
- `ACTION_PATH` : Path where the .json actions files are located.
- `LOG_PATH` : Path where the log files is located.
- `DATE_FORMAT` : Date format the users have to respect. It's like the law but way cooler.
- `AUTHORIZED_DM` : Authorize bot to respond to private messages.
- `SPAM_LIMIT` : Number of message before spam limit.
- `SPAM_TIME` : Cooldown time (in millisecond).
- `RANDOM_RESPONSE` : Chances of random responses.
- `EMBED_COLOR` : Embed message's border color.
- `PORT` : HTTP Server port.


Dependencies :
- [NodeJS](https://nodejs.org/en/)
- [Discord.js](https://www.npmjs.com/package/discord)
- [Cron](https://www.npmjs.com/package/cron)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Moment](https://www.npmjs.com/package/moment)
- [@discordjs/uws](https://www.npmjs.com/package/@discordjs/uws)
- [Bufferutil](https://www.npmjs.com/package/bufferutil)
- [Libsodium-wrappers](https://www.npmjs.com/package/libsodium-wrappers)
- [OpusScript](https://www.npmjs.com/package/opusscript)
- [http-server](https://www.npmjs.com/package/http-server)

# Commands
| Command | Action |
| ------ | ------ |
| !help | Show help |
| !add [DATE_FORMAT] | Add birthday |
| !delete | Delete user's birthday |
| !setDefault | Set default channel where birthday are wished (Admin only) |
| !source | Give bot's Github |
| !roll XdY | Roll a dice (x=nb dice ; y=nb dice faces) |
| !sroll XdY | Roll a secret dice (x=nb dice ; y=nb dice faces) |
| !poll | Show poll help |
| !poll "lorem ipsum" | Create a Yes/No poll |
| !poll "lorem ipsum" "dolor" "sit" "amet" | Create a multi answer poll |
| !startcs both/t/ct | Give you random strat for Counter Strike |
| !ping | Pong. |

# ToDo

- ~~Clevercloud proof.~~
- ~~Add Poll.~~
- ~~Refacto help message.~~
- ~~Add HTML homepage.~~
- ~~Add Counter Strike strategy.~~
- Refacto Random to add random reaction.
- Refacto sources message.
- Refacto wish.
- Add multi languages ?
- Add Google Natural Language API.
- Improve the bot, so he will become a real little boy.

# Invite this bot to your server

[Invite](https://discordapp.com/api/oauth2/authorize?client_id=678527921140400138&permissions=8&scope=bot)

# Bot's website

[Website](https://scordbot.thomas-merel.fr/)

# License

This project is on Beer-Ware license :

>  "THE BEER-WARE LICENSE" (Revision 42):
>  <thomas.merel.44@gmail.com> wrote this project.  As long as you retain this
>  notice you can do whatever you want with this stuff. If we meet some day,
>  and you think this stuff is worth it, you can buy me a beer in return.
>
>  Poul-Henning Kamp

# Links

[Twitter](https://twitter.com/Vulture___) | [Website](https://thomas-merel.fr) | [Github](https://github.com/thomasmerel) | [Vulture#2306](https://discordapp.com/)
