
import pino from 'pino';

const logger = pino({
    level: 'info',
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
});

interface LogMetadata {
    jobId?: string;
    flowId?: string;
    model?: string;
    tokens?: number;
    [key: string]: any;
}

export const log = {
    info: (message: string, metadata?: LogMetadata) => {
        logger.info(metadata, message);
    },
    warn: (message: string, metadata?: LogMetadata) => {
        logger.warn(metadata, message);
    },
    error: (message: string, error: Error, metadata?: LogMetadata) => {
        logger.error({ ...metadata, err: error }, message);
    },
};
