import { PaymentStatusType } from '@/Core/Enums/PaymentStatusType';
import { PaymentDto } from '@/Core/Models/Entities/Payment';

export default interface IPaymentRepository {
  save(payment: PaymentDto): Promise<void>;
  findById(id: string): Promise<PaymentDto>;
  updateStatus(id: string, status: PaymentStatusType): Promise<void>;
}
