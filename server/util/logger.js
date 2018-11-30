import expressWinston from "express-winston";
import winston from "winston";
import fs from "fs";
import path from "path";

const logsPath = path.resolve(__dirname, "../logs");

if (!fs.existsSync(logsPath)) fs.mkdirSync(logsPath);

export const logger = () => {
  return expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: `${logsPath}/stdout.log`,
        level: "debug"
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function(req, res) {
      return false;
    } // optional: allows to skip some log messages based on request and/or response
  });
};

export const errLogger = () => {
  return expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: `${logsPath}/stderr.log`,
        level: "error"
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  });
};
