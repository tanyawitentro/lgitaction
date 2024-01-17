import { createLogger, format, LeveledLogMethod, Logger, LoggerOptions, transports } from 'winston'
import { ILogData, ILogMessage, ITransformableInfo } from '../interfaces/log'
import { transactionNamespace } from './namespace'
import fs from 'fs'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'

const prefix = 'ovms'
const logDir = 'logs'
const appLogDir = path.join(logDir, 'app')
const infoLogDir = path.join(logDir, 'info')
const serviceLogDir = path.join(logDir, 'service')

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

if (!fs.existsSync(appLogDir)) {
    fs.mkdirSync(appLogDir)
}

if (!fs.existsSync(infoLogDir)) {
    fs.mkdirSync(infoLogDir)
}

if (!fs.existsSync(serviceLogDir)) {
    fs.mkdirSync(serviceLogDir)
}

const logger = createWinstonLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                createConsoleAppLogFormat(),
            )
        }),
        new DailyRotateFile({
            filename: path.join(appLogDir, `${prefix}-%DATE%.app.log`),
            datePattern: 'YYYYMMDDHH',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.json(),
                createFileAppLogFormat()
            )
        })
    ]
})

const infoLogger = createWinstonLogger({
    level: 'addLog',
    levels: {
        addLog: 0
    },
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                createConsoleInfoServiceLogFormat(),
            )
        }),
        new DailyRotateFile({
            filename: path.join(infoLogDir, `${prefix}-%DATE%.info.log`),
            datePattern: 'YYYYMMDDHH',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.json(),
                createFileInfoServiceLogFormat()
            )
        })
    ]
})

const serviceLogger = createWinstonLogger({
    level: 'addLog',
    levels: {
        addLog: 0
    },
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                createConsoleInfoServiceLogFormat(),
            )
        }),
        new DailyRotateFile({
            filename: path.join(serviceLogDir, `${prefix}-%DATE%.service.log`),
            datePattern: 'YYYYMMDDHH',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.json(),
                createFileInfoServiceLogFormat()
            )
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level')
}

export { logger, infoLogger, serviceLogger }

function createWinstonLogger<T>(options?: Pick<LoggerOptions, Exclude<keyof LoggerOptions, 'levels'>> & { levels?: T }) {
    return createLogger(options as LoggerOptions) as Logger & Record<keyof T, LeveledLogMethod>
}

function createConsoleAppLogFormat() {
    return format.printf((info: ITransformableInfo) => {
        let logData: unknown = info.message
        const transaction = [transactionNamespace.get('sessionId'), transactionNamespace.get('transactionId')].filter(Boolean).join('-')

        const splatMessage = getSplatMessage(info)
        if (typeof logData === 'object') {
            logData = JSON.stringify(logData)
        }
        if (splatMessage) {
            logData += ' ' + splatMessage
        }
        return `${info.timestamp}|${transaction ? transaction + '|' : ''}${info.level}|${logData}`
    })
}

function createFileAppLogFormat() {
    return format.printf((info: ITransformableInfo) => {
        let logData: unknown = info.message
        const transaction = [transactionNamespace.get('sessionId'), transactionNamespace.get('transactionId')].filter(Boolean).join('-')
        const splatMessage = getSplatMessage(info)
        if (splatMessage) {
            if (typeof logData === 'object') {
                logData = JSON.stringify(logData)
            }
            logData += ' ' + splatMessage
        }
        return JSON.stringify({
            LEVEL: info.level,
            TIMESTAMP: info.timestamp,
            SESSION_ID: transaction ? transaction : undefined,
            MESSAGE: logData
        })
    })
}

function createConsoleInfoServiceLogFormat() {
    return format.printf((info: ITransformableInfo) => {
        const logData = info.message as ILogData
        const transaction = [transactionNamespace.get('sessionId'), transactionNamespace.get('transactionId')].filter(Boolean).join('-')
        const logMessage: ILogMessage = {
            TIMESTAMP: info.timestamp as string,
            SESSION_ID: transaction,
            SERVICE_ENDPOINT: logData.endpoint,
            STATUS: logData.statusCode,
            REQUEST_METHOD: logData.req.method,
            REQUEST_URI: logData.req.uri,
            // REQUEST_BODY: logData.req.body && Object.keys(logData.req.body).length > 0 ? logData.req.body : undefined,
            REQUEST_BODY: logData.req.body,
            RESPONSE_BODY: logData.res.body,
            ERROR_MESSAGE: logData.res.error,
            RESPONSE_TIME: logData.responseTime
        }
        return Object.values(logMessage).filter(Boolean).map(el => {
            if (typeof el === 'object') {
                return JSON.stringify(el)
            }
            return el
        }).join('|')
    })
}

function createFileInfoServiceLogFormat() {
    return format.printf((info: ITransformableInfo) => {
        const logData = info.message as ILogData
        const transaction = [transactionNamespace.get('sessionId'), transactionNamespace.get('transactionId')].filter(Boolean).join('-')
        const logMessage: ILogMessage = {
            TIMESTAMP: info.timestamp as string,
            SESSION_ID: transaction ? transaction : undefined,
            SERVICE_ENDPOINT: logData.endpoint,
            STATUS: logData.statusCode,
            REQUEST_METHOD: logData.req.method,
            REQUEST_URI: logData.req.uri,
            REQUEST_HEADER: logData.req.header,
            REQUEST_BODY: logData.req.body,
            RESPONSE_HEADER: logData.res.header,
            RESPONSE_BODY: logData.res.body,
            ERROR_MESSAGE: logData.res.error,
            RESPONSE_TIME: logData.responseTime
        }
        return JSON.stringify(logMessage)
    })
}

function getSplatMessage(info: ITransformableInfo) {
    const splatArgs = info[Symbol.for('splat')] as unknown[]
    if (!splatArgs) {
        return ''
    }
    return splatArgs.map(el => {
        if (typeof el === 'object') {
            return JSON.stringify(el)
        }
        return el
    }).join(' ')
}
