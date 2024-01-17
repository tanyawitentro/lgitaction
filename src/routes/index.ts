import express from 'express'
const router = express.Router()

import * as test from './test/router'

test.Register(router)

export const Router = router