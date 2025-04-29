import { ClassConstructor, plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { validate, ValidationError } from 'class-validator'

function reduceErrors(errors: ValidationError[]) {
    return errors.reduce((acc: Record<string, any>, error: ValidationError) => {
        if (error.children?.length) {
            acc[error.property] = reduceErrors(error.children)
        } else {
            acc[error.property] = Object.values(error.constraints || [])[0]
        }

        return acc
    }, {})
}

export default function validationMiddleware<T extends object>(
    field: 'body' | 'query' | 'params' | 'cookies',
    classType: ClassConstructor<T>,
    groups: string[] | ((request: Request) => string[]) = []
) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const transformer = plainToClass(classType, request[field], {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
            groups: groups instanceof Array ? groups : groups(request)
        })

        const errors = await validate(transformer, {
            validationError: { target: false },
            stopAtFirstError: false,
            groups: groups instanceof Array ? groups : groups(request),
            always: true,
            strictGroups: true
        })

        if (errors.length) {
            const message = reduceErrors(errors)
            response.status(400).json({
                status: 400,
                success: false,
                data: {
                    code: 400,
                    message
                }
            })
        } else {
            request[field] = transformer
            next()
        }
    }
}
