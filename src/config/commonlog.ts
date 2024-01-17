import { CommonLogConfig } from "../interfaces/commonlog"
import { SERVIVE_NAME } from './config'

const rootDirLogg: string = 'logs'
export const confLogg: CommonLogConfig = {
    projectName: SERVIVE_NAME,
    log: {
        time: 15,
        size: null,
        path: `./${rootDirLogg}/appLogPath/`,
        level: 'debug', //debug, info, warn, error
        autoAddResBody: true,
        format: 'pipe', //pipe, json
        console: true,
        file: true,
        stream: false,
        kafka: false,
    },
    clog: [
        {
            name: 'refname',
            fileName: 'customFileName',
            fileExt: 'customExtension',
            time: 15,
            size: null,
            path: `./${rootDirLogg}/cPath/`,
            console: false,
            file: false, // true or false
            stream: false,
            kafka: false,
        },
    ],
    summary: {
        time: 15,
        size: null,
        path: `./${rootDirLogg}/summaryPath/`,
        format: 'json',
        console: false,
        file: true,
        stream: false,
        kafka: false,
    },
    detail: {
        time: 15,
        size: null,
        path: `./${rootDirLogg}/detailPath/`,
        rawData: true,
        format: 'json',
        console: false,
        file: true,
        stream: false,
        kafka: false,
        analyticData: {
            input: {
                default: {
                    Result: 'path.to.result',
                    Desc: 'path.to.desc',
                },
                node_cmd1: {
                    Result: 'path.to.result',
                    Desc: 'path.to.desc',
                },
                node_cmd2: {
                    Result: 'path.to.result',
                    Desc: 'path.to.desc',
                },
            },
            output: {
                default: {
                    Result: 'path.to.result',
                    Desc: 'path.to.desc',
                },
                node_cmd2: {
                    Result: 'path.to.result',
                    Desc: 'path.to.desc',
                },
            },
        },
    },
    stat: {
        time: 15,
        size: null,
        path: `./${rootDirLogg}/statPath/`,
        pathDB: undefined,
        statInterval: 15,
        console: false,
        file: false, // true or false
        stream: false,
        kafka: false,
        prometheus: false,
        prometheusMode: 'single',
        prometheusCustomLabels: null,
        flush: false,
        format: 'json',
        process: [
            {
                name: 'stat_name_a',
                threshold: 3,
                severity: 'critical',
                promLabel: {
                    label1: 'value',
                    code: '200',
                    method: 'get',
                },
            },
            {
                name: 'stat_name_b',
                threshold: 1,
            },
        ],
    },
    alarm: {
        time: 15,
        size: null,
        path: `./${rootDirLogg}/alarmPath/`,
        console: false,
        file: false, // true or false
        process: [
            {
                id: 1,
                name: 'stat_name_a',
            },
        ],
    },
}