import log4js, { Logger, Configuration } from "log4js";
import { LoggerOptions } from "../interfaces";

export function initLogger(options?: LoggerOptions): Logger {
    const log_name = options && options.log_name ? options.log_name : "patroller-api";
    const type = options && options.type ? options.type : "stdout";
    const level = options && options.level ? options.level : "trace";

    const config: Configuration = {
        appenders: { [log_name]: { type } },
        categories: { default: { appenders: [log_name], level } }
    };

    if (type === 'file') {
        config.appenders[log_name] = { type, filename: `./logs/${new Date().getTime()}_${log_name}.log` };
    }

    log4js.configure(config);

    return log4js.getLogger(log_name);
}


