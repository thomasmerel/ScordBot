module.exports = class Logs {
    static snap(message) {
        let fs = require('fs');
        const moment = require('moment');

        let path = process.env.LOG_PATH;

        let now = moment().format('DD-MM-YYYY HH:mm:ss');
        let log = '[' + now + '] - ' + message + '\r\n';

        fs.exists(path, function (exists) {
            if (exists) {
                fs.appendFile(path, log, function (err) {
                    if (err) throw err;
                });
            } else {
                fs.writeFile(path, log, function (err) {
                    if (err) throw err;
                });
            }
        });
    }
};