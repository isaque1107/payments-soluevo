import { NextFunction, Request, Response } from 'express'

export function serverErrorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const showDetail = process.env.NODE_ENV !== 'production'

    console.error(error)

    res.status(500).send({
        type: 'SERVER_ERROR',
        error: {
            message: error.message,
            ...(showDetail && {
                details: error.stack
            })
        }
    })
}

export function notFoundMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(404).send({
        type: 'NOT_FOUND',
        error: { message: `Path '${req.url}' not found` }
    })
}
