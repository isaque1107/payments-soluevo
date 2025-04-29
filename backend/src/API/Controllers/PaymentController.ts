import { before, GET, POST, route } from 'awilix-router-core';
import { Request, Response, NextFunction } from 'express';
import authMiddleware from '@/API/Middlewares/authMiddleware';
import validationMiddleware from '@/API/Middlewares/validationMiddleware';
import IPaymentService from '@/Core/Interfaces/Application/IPaymentService';
import { CreatePaymentDto } from '@/Core/Models/Entities/Payment';
import { Exception } from '@/Core/Exceptions/Exception';

@route('/payments')
export default class PaymentController {
    constructor(private paymentService: IPaymentService) { }

    @POST()
    @before([
        authMiddleware(),
        validationMiddleware('body', CreatePaymentDto)
    ])
    async create(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const id = await this.paymentService.create(request.body);
            response.status(201).json({
                status: 201,
                success: true,
                data: {
                    id
                }
            })
        } catch (error) {
            if (error instanceof Exception) {
                response.status(500).json({
                    status: 500,
                    success: false,
                    data: {
                        code: 500,
                        message: error.data.message
                    }
                })
            }
        }
    }

    @route('/:id')
    @GET()
    @before([
        authMiddleware()
    ])
    async findById(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = request.params;
            const payment = await this.paymentService.findById(id);
            response.status(200).json({
                status: 200,
                success: true,
                data: payment
            });
        } catch (error) {
            if (error instanceof Exception) {
                response.status(500).json({
                    status: 500,
                    success: false,
                    data: {
                        code: 500,
                        message: error.data.message
                    }
                });
            }
        }
    }
}
