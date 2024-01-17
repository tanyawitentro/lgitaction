import { Router } from 'express'
import validatorMiddleware from '../../middleware/validator'
import { IReqBody } from './interfaces'
import * as controller from './controller'
import { testSchema } from './schema'

export const Register = (router: Router) => {
    router.get('/test', controller.testGet)
    router.post('/test', validatorMiddleware<IReqBody>(testSchema), controller.testPost)
    router.post('/test/gen-token', validatorMiddleware<IReqBody>(testSchema), controller.testGenToken)
}
