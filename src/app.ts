import express from 'express'
import helmet from 'helmet'
import responseHandler from './middleware/responseHandler'
import { json } from 'body-parser'
import { Router } from './routes'
import { auth } from './utils/auth'

const app = express()
app.enable('trust proxy')
app.use(json())
app.use(helmet())
app.use(responseHandler)

app.use('/api/v1', auth, Router)
app.use('/api-dev/v1', Router)

export default app