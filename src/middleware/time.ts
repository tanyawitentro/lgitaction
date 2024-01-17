import { Request, Response, NextFunction } from 'express'
import { timeNamespace } from '../utils/namespace'

export default (req: Request, res: Response, next: NextFunction) => {
  timeNamespace.run(() => {
    timeNamespace.set('startTime', new Date().getTime())
    next()
  })
}