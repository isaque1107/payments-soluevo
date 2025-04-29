import { NextFunction, Request, Response } from 'express';

export default function authMiddleware() {
    return (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json({
                status: 401,
                success: false,
                message: 'Token não informado.'
            });
        }

        const token = authHeader.replace('Bearer ', '').trim();
        const fixedToken = process.env.JWT_TOKEN;

        if (!fixedToken) {
            return response.status(500).json({
                status: 500,
                success: false,
                message: 'JWT_TOKEN não configurado no servidor.'
            });
        }

        if (token !== fixedToken) {
            return response.status(401).json({
                status: 401,
                success: false,
                message: 'Token inválido.'
            });
        }

        next(); 
    };
}
