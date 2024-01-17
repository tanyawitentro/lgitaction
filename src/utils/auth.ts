import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { AUTH_SECRET } from '../config/config'
import { CustomRequest } from '../interfaces/auth'

export const SECRET_KEY: Secret = AUTH_SECRET

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            throw new Error()
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded

        next()
    } catch (err) {
        res.status(401).send('Please authenticate')
    }
}

export const authGenToken = async (req: Request) => {
    try {
        const token = jwt.sign({ _id: '12345'?.toString(), name: req.body.username }, SECRET_KEY, {
            expiresIn: '2 days',
        })

        return { user: { _id: '12345', name: req.body.username }, token: token }

    } catch (err) {

    }
}