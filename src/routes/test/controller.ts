import { Request, Response } from 'express'
import { RESPONSE_CODE } from '../../constants/response-codes'
import { IReqBody } from './interfaces'
import { logg, loggDetail, loggSummary } from '../../utils/commonlog'
import { authGenToken } from '../../utils/auth'


export const testGet = async (req: Request, res: Response) => {

    logg.info(`controller testGet`)

    try {

        loggDetail()
        loggSummary()

        return res.status(RESPONSE_CODE.OK.HTTP_STATUS).json({ result: "test get ok" })
    } catch (error) {
        logg.error(`controller testGet [error] :: ${error}`)
    }

}

export const testPost = async (req: Request, res: Response) => {

    logg.info(`controller testPost`)

    try {
        
        const reqBody: IReqBody = req.body
        logg.info(`${reqBody}`)
    
        return res.status(RESPONSE_CODE.OK.HTTP_STATUS).json(reqBody)

    } catch (error) {
        logg.error(`controller testPost [error] :: ${error}`)   
    }

}

export const testGenToken = async (req: Request, res: Response) => {

    logg.info(`controller testGenToken`)

    try {
    
        // const token: object = await authGenToken(req)
        return res.status(RESPONSE_CODE.OK.HTTP_STATUS).json(await authGenToken(req))

    } catch (error) {
        logg.error(`controller testPost [error] :: ${error}`)   
    }

}