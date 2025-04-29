import { v4 as uuidv4 } from 'uuid';
import IPaymentService from '@/Core/Interfaces/Application/IPaymentService';
import { CreatePaymentDto, PaymentDto } from '@/Core/Models/Entities/Payment';
import { PaymentStatusType } from '@/Core/Enums/PaymentStatusType';
import IPaymentRepository from '@/Infrastructure/Database/Repositories/PaymentRepository';
import { PaymentQueue } from '@/Infrastructure/Queues/PaymentQueue';

export default class PaymentService implements IPaymentService {
    constructor(
        protected paymentRepository: IPaymentRepository,
        protected inMemoryQueue: PaymentQueue // Substitua pelo tipo correto do seu inMemoryQueue
    ) {}

    async create(paymentData: CreatePaymentDto): Promise<string> {
    
        const payment = new PaymentDto();
        payment.id = uuidv4();
        payment.payerName = paymentData.payerName;
        payment.amount = paymentData.amount;
        payment.method = paymentData.method;
        payment.status = PaymentStatusType.PENDING;

        await this.paymentRepository.save(payment);
         this.inMemoryQueue.add(payment.id);

        return payment.id;
    }

    async findById(id: string): Promise<PaymentDto> {
        const payment = await this.paymentRepository.findById(id);

        return payment;
    }
}
