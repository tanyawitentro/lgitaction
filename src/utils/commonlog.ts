import { confLogg } from "../config/commonlog"
import { RESPONSE_CODE } from '../constants/response-codes'

// Initializing commonlog using the provided configuration
let logg = require('commonlog-kb').init(confLogg)

let loggDetail = () => {
    const ddd = logg.detail('session1', 'initInvoke', 'cmd', 'identity')

    let protocol: string = "http"
    let protocolMethod: string = "get"
    ddd.addInputRequest('node', 'cmd', 'invoke', 'rawData', {}, protocol, protocolMethod)
    ddd.addOutputRequest('node', 'cmd', 'invoke', 'rawData', {}, protocol, protocolMethod)
    ddd.end()
}

let loggSummary = () => {

    const sessionId = Math.floor(Math.random() * 1000).toString()
    let summary = logg.summary(sessionId, 'initInvoke', 'testGet cmd', 'identity')  //CREATE summaryLog
    summary.addField('tid', 'tid1')  //OPTIONAL add field
    summary.addSuccessBlock('test', 'testGet', RESPONSE_CODE.OK.HTTP_STATUS , RESPONSE_CODE.OK.MESSAGE)  //OPTIONAL add sequence 
    summary.end(RESPONSE_CODE.OK.CODE, RESPONSE_CODE.OK.MESSAGE)  //WITE summaryLog (sync)
}

export {
    logg,
    loggDetail,
    loggSummary
}