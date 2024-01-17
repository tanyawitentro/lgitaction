export interface LogStream {
    host: string;
    port: number;
    maxQueueSize: number;
}

export interface KafkaHost {
    host: string;
    port: number;
}

export interface KafkaConfig {
    logger: boolean;
    partition: number;
    kafkaHost: KafkaHost[];
}

export interface AppLogConfig {
    time: number;
    size: number | null;
    path: string;
    level: string;
    autoAddResBody: boolean;
    format: string;
    console: boolean;
    file: boolean;
    stream: boolean;
    kafka: boolean;
}

export interface CustomLogConfig {
    name: string;
    fileName: string;
    fileExt: string;
    time: number;
    size: number | null;
    path: string;
    console: boolean;
    file: boolean;
    stream: boolean;
    kafka: boolean;
}

export interface SummaryLogConfig {
    time: number;
    size: number | null;
    path: string;
    format: string;
    console: boolean;
    file: boolean;
    stream: boolean;
    kafka: boolean;
}

export interface InputAnalyticData {
    Result: string;
    Desc: string;
}

export interface OutputAnalyticData {
    Result: string;
    Desc: string;
}

export interface AnalyticData {
    input: {
        default: InputAnalyticData;
        [key: string]: InputAnalyticData;
    };
    output: {
        default: OutputAnalyticData;
        [key: string]: OutputAnalyticData;
    };
}

export interface DetailLogConfig {
    time: number;
    size: number | null;
    path: string;
    rawData: boolean;
    format: string;
    console: boolean;
    file: boolean;
    stream: boolean;
    kafka: boolean;
    analyticData: AnalyticData;
}

export interface StatProcess {
    name: string;
    threshold: number;
    severity?: string;
    promLabel?: {
        [key: string]: string;
    };
}

export interface StatConfig {
    time: number;
    size: number | null;
    path: string;
    pathDB?: string;
    statInterval: number;
    console: boolean;
    file: boolean;
    stream: boolean;
    kafka: boolean;
    prometheus: boolean;
    prometheusMode: string;
    prometheusCustomLabels: string[] | null;
    flush: boolean;
    format: string;
    process: StatProcess[] | string;
}

export interface AlarmProcess {
    id: number;
    name: string;
}

export interface AlarmConfig {
    time: number;
    size: number | null;
    path: string;
    console: boolean;
    file: boolean;
    process: AlarmProcess[] | string;
}

export interface CommonLogConfig {
    projectName: string;
    logStream?: LogStream;
    kafka?: KafkaConfig;
    log: AppLogConfig;
    clog: CustomLogConfig[];
    summary: SummaryLogConfig;
    detail: DetailLogConfig;
    stat: StatConfig;
    alarm: AlarmConfig;
}