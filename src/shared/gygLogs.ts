import { Loglevel } from 'src/context';
import * as winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

export class Log {
  static Log: winston.Logger;

  static logInit() {
    const format = winston.format.combine(
      winston.format.printf(
        (info: { level: Loglevel; message: string }) =>
          ` ${info.level}: [${info.message}]`,
      ),
    );

    const consoleLogger = {
      handleExceptions: true,
      level: Loglevel.DEBUG,
      format: format,
    };

    this.Log = winston.createLogger({
      levels,
      transports: [new winston.transports.Console(consoleLogger)],
    });
  }

  static writeLog(
    level: Loglevel,
    methodName: string,
    actionName: string,
    message: unknown,
    uniqueId: string,
  ) {
    if (!this.Log) {
      this.logInit();
    }
    this.Log.log(
      level,
      `[${uniqueId}] [${methodName}][${actionName}] ${this.messageFormat(message)}`,
    );
  }

  static writeExitLog(
    level: Loglevel,
    methodName: string,
    actiontype: string,
    request: unknown,
    response: unknown,
    uniqueId: string,
  ) {
    if (!this.Log) {
      this.logInit();
    }
    this.Log.log(
      level,
      `[${uniqueId}] [${methodName}][${actiontype}] [Request] ${this.messageFormat(request)} `,
    );

    if (response instanceof Error) {
      this.Log.log(
        level,
        `[${uniqueId}] [${methodName}] [Error] ${this.messageFormat(response.message)}`,
      );
    } else
      this.Log.log(
        level,
        `[${uniqueId}] [${methodName}] [Response] ${this.messageFormat(response)}`,
      );
  }

  static messageFormat = (message: unknown) => {
    if (message) {
      return JSON.stringify(message);
    }
    return message;
  };
}

export class GygLog {
  moduleName: string;
  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  writeLog(
    actionName: string,
    message: unknown,
    uniqueId: string,
    level: Loglevel = Loglevel.INFO,
  ) {
    Log.writeLog(level, this.moduleName, actionName, message, uniqueId);
  }

  writeExitLog(
    actionName: string,
    request: unknown,
    response: unknown,
    uniqueId: string,
    level: Loglevel = Loglevel.INFO,
  ) {
    Log.writeExitLog(
      level,
      this.moduleName,
      actionName,
      request,
      response,
      uniqueId,
    );
  }

  info(actionName: string, message: unknown, uniqueId: string) {
    this.writeLog(actionName, message, uniqueId, Loglevel.INFO);
  }
  warn(actionName: string, message: unknown, uniqueId: string) {
    this.writeLog(actionName, message, uniqueId, Loglevel.WARN);
  }

  error(actionName: string, message: unknown, uniqueId: string) {
    this.writeLog(actionName, message, uniqueId, Loglevel.ERROR);
  }
}
