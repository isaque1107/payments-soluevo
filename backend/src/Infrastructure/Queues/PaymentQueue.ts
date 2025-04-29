import IPaymentRepository from '@/Core/Interfaces/Repositories/IPaymentRepository';
import { PaymentStatusType } from '@/Core/Enums/PaymentStatusType';

class PaymentQueue {
    private queue: string[] = [];
    private isProcessing = false;

    constructor(protected paymentRepository: IPaymentRepository) { }

    async add(paymentId: string): Promise<void> {
        this.queue.push(paymentId);
        this.process();
    }

    private process = async (): Promise<void> => {
        if (this.isProcessing) return;

        this.isProcessing = true;

        while (this.queue.length > 0) {
            const paymentId = this.queue.shift();
            if (paymentId) {
                // Simula delay de 5 segundos
                await new Promise(resolve => setTimeout(resolve, 5000));

                // Escolhe aleatoriamente entre APPROVED ou FAILED
                const randomStatus = Math.random() > 0.3
                    ? PaymentStatusType.APPROVED
                    : PaymentStatusType.FAILED;

                await this.paymentRepository.updateStatus(paymentId, randomStatus);
            }
        }

        this.isProcessing = false;
    }

}

export { PaymentQueue };
