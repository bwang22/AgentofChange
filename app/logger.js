const { createLogger, format, transports } = require('winston');
const { printf } = format;

const myFormat = printf(info => {
    var msg = `\t------ ${(new Date()).toLocaleString("en-US", { timeZone: "America/New_York" })} ------\n${info.message}\n\t------------------------`;
    if (info.note !== undefined)
        msg += `\n(${info.note})`;
    if (info.data !== undefined)
        msg += `\n(${info.data})`;
    msg += "\n\n";
    return msg;
});

// Logger
const logger = createLogger({
    format: myFormat,
    transports: [new transports.File({ filename: 'error.log', level: 'error' })]
});

module.exports = logger;