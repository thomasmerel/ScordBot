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
- `RANDOM_RESPONSE` : Chances of random responses.
- `CC_FS_BUCKET` : Clevercloud FS Bucket.
- `AUTHORIZED_DM` : Authorize bot to respond to private messages.


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
| --help | Show help |
| --add [DATE_FORMAT] | Add birthday |
| --delete | Delete user's birthday |
| --setDefault | Set default channel where birthday are wished (Admin only) |
| --source | Give bot's Github |
| --roll XdY | Roll a dice (x=nb dice ; y=nb dice faces) |
| --sroll XdY | Roll a secret dice (x=nb dice ; y=nb dice faces) |
| --ping | Pong. |

# ToDo

- ~~Clevercloud proof.~~
- Add Google Natural Language API.
- Improve the bot, so he will become a real little boy.

# Invite this bot to your server

[Invite](https://discordapp.com/api/oauth2/authorize?client_id=678527921140400138&permissions=8&scope=bot)

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