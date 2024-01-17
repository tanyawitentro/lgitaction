import { Request, Response, NextFunction } from 'express'
import { ILogData } from '../interfaces/log'
import { timeNamespace } from '../utils/namespace'
import { logg } from '../utils/commonlog'

export default (req: Request, res: Response, next: NextFunction) => {
  const oldSend = res.json
  res.json = (data) => {
    const startTime = timeNamespace.get('startTime')
    const endTime = new Date().getTime()
    const responseTime = endTime - startTime
    const logData: ILogData = {
      statusCode: res.statusCode,
      req: {
        method: req.method,
        uri: req.url,
        header: req.headers,
        body: req.body
      },
      res: {
        header: res.getHeaders()
      },
      responseTime: responseTime
    }
    res.json = oldSend
    logData.res.body = data
    logg.info('tid-001-example', logData)
    return res.json(data)

  }
  next()
}