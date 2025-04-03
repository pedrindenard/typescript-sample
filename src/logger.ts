import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, json, splat } = format;

const timestampFormat = { format: 'YYYY-MM-DD HH:mm:ss' }
const printfFormat = ({ level, message, timestamp, stack }: any) => {
    return stack
        ? `[${timestamp}] ${level}: ${message} - ${stack}`
        : `[${timestamp}] ${level}: ${message}`;
};

const console = combine(
    colorize(),
    timestamp(timestampFormat),
    printf(printfFormat),
    splat()
);

const fileFormat = combine(
    timestamp(),
    splat(),
    json()
);

const transport = new DailyRotateFile({ filename: 'logs/error-%DATE%.log', datePattern: 'YYYY-MM-DD', format: fileFormat });

const logger = createLogger({ level: 'info', format: fileFormat, transports: [transport] });

if (process.env.NODE_ENV !== 'production') {
    const cons = new transports.Console({ format: console })
    logger.add(cons);
}

export default logger;