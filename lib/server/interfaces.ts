export interface PatrollerApiOptions {
    port?: number;
    logger?: LoggerOptions;
}

export interface LoggerOptions {
    log_name?: string,
    type?: string,
    level?: string
}