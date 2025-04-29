import { CreatePaymentDto, PaymentDto } from '@/Core/Models/Entities/Payment';

export default interface IPaymentService {
  create(payment: CreatePaymentDto): Promise<string>;
  findById(id: string): Promise<PaymentDto>;
}
