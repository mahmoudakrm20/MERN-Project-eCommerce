const winston = require("winston");

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
}

class LoggerServices {
  constructor(route) {
    this.route = route;
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.printf(info => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`;
        message = info.obj ? message + ` data ${JSON.stringify(info.obj)}` : message;
        return message;
      }),
      transports: [
        new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH}/${route}.log` }),
      ]
    });
  }

  log(level, message, obj) {
    if (obj) {
      this.logger.log(level, message, { obj });
    } else {
      this.logger.log(level, message);
    }
  }

  info(message, obj) {
    this.log('info', message, obj);
  }

  error(message, obj) {
    this.log('error', message, obj);
  }

  debug(message, obj) {
    this.log('debug', message, obj);
  }
}

module.exports = LoggerServices;
