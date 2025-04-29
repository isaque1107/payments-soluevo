import IPaymentRepository from '@/Core/Interfaces/Repositories/IPaymentRepository';
import { PaymentDto } from '@/Core/Models/Entities/Payment';
import { PaymentStatusType } from '@/Core/Enums/PaymentStatusType';
import { Exception } from '@/Core/Exceptions/Exception';

export default class PaymentRepository implements IPaymentRepository {
    private payments: Map<string, PaymentDto> = new Map();

    public async save(payment: PaymentDto): Promise<void> {
        this.payments.set(payment.id, payment);
    }

    public async findById(id: string): Promise<PaymentDto> {
        const payment = this.payments.get(id);
        if (!payment) {
            throw new Exception(404, new Error('Pagamento não encontrado'));
        }
        return payment;
    }

    public async updateStatus(id: string, status: PaymentStatusType): Promise<void> {
        const payment = this.payments.get(id);
        if (!payment) {
            throw new Exception(404, new Error('Pagamento não encontrado para atualização'));
        }
        payment.status = status;
        this.payments.set(id, payment);
        console.info(`Pagamento ${id} atualizado para o status ${status}`);
    }
}
