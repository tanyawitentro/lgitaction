import Ajv, { JSONSchemaType } from 'ajv'
import ajvFormats from 'ajv-formats'

import { NextFunction, Request, Response } from 'express'
import { RESPONSE_CODE } from '../constants/response-codes'

const ajv = new Ajv({
  allErrors: true
})

ajvFormats(ajv)
ajv.addKeyword({
  keyword: 'isNotEmpty',
  type: 'string',
  validate: (condition: boolean, data: string) => {
    if (!condition) {
      return true
    }
    return typeof data === 'string' && data.trim() !== ''
  }
})

function validateRequestBySchema<T>(schema: JSONSchemaType<T>, data: T) {
  schema.properties
  const validate = ajv.compile(schema)
  if (!validate(data)) {
    const mapErrors = validate.errors?.map(error => ({
      params: error.instancePath ? error.instancePath.replace('/', '') : error.params['missingProperty'],
      message: error.message
    }))

    const ret = {
      code: RESPONSE_CODE.MISSING_OR_INVALID.CODE,
      message: RESPONSE_CODE.MISSING_OR_INVALID.MESSAGE,
      data: mapErrors
    }
    throw { status: RESPONSE_CODE.MISSING_OR_INVALID.HTTP_STATUS, message: ret, type: 'json-schema' }
  }
  return data
}

function getReqDataKey(method: string) {
  let reqDataKey
  switch (method) {
    case 'GET':
      reqDataKey = 'query'
      break
    case 'POST':
      reqDataKey = 'body'
      break
    case 'PUT':
      reqDataKey = 'body'
      break
    case 'DELETE':
      reqDataKey = 'body'
      break
    default:
      reqDataKey = 'body'
      break
  }
  return reqDataKey
}

export default <T>(schema: JSONSchemaType<T>) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const reqDataKey = getReqDataKey(req.method)
    try {
      await validateRequestBySchema<T>(schema, req[reqDataKey as keyof typeof req])
      next()
    }
    catch (error) {
      next(error)
    }
  }
}
