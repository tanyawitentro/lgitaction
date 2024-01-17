export interface ILogData {
  statusCode?: number
  req: {
    method?: string
    uri?: string
    header?: object
    body?: unknown
  },
  res: {
    header?: object
    body?: unknown
    error?: unknown
  }
  responseTime?: string | number
  endpoint?: string
}

export interface ILogMessage {
  TIMESTAMP?: string
  SESSION_ID?: string
  SERVICE_ENDPOINT?: string
  STATUS?: number
  REQUEST_METHOD?: string
  REQUEST_URI?: string
  REQUEST_HEADER?: object
  REQUEST_BODY?: unknown
  RESPONSE_HEADER?: object
  RESPONSE_BODY?: unknown
  ERROR_MESSAGE?: unknown
  RESPONSE_TIME?: string | number
}

export interface ITransformableInfo {
  level: string
  message: ILogData
  [key: string | symbol]: unknown
}