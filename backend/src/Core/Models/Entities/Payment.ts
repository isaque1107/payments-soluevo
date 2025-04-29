import { PaymentMethodType } from '@/Core/Enums/PaymentMethodType';
import { PaymentStatusType } from '@/Core/Enums/PaymentStatusType';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreatePaymentDto {
  @Expose()
  @IsString({ message: 'É necessário informar o nome do pagador' })
  @IsNotEmpty({ message: 'É necessário informar o nome do pagador' })
  public payerName: string;

  @Expose()
  @IsNumber({}, { message: 'É necessário informar o valor do pagamento' })
  @IsNotEmpty({ message: 'É necessário informar o valor do pagamento' })
  public amount: number;

  @Expose()
  @IsEnum(PaymentMethodType, { message: 'Método de pagamento inválido' })
  public method: PaymentMethodType;

  @Expose()
  @IsEnum(PaymentStatusType, { message: 'Status de pagamento inválido' })
  @IsOptional()
  public status: PaymentStatusType = PaymentStatusType.PENDING;
}


export class PaymentDto {
  @Expose()
  @IsUUID()
  public id: string;

  @Expose()
  public payerName: string;

  @Expose()
  public amount: number;

  @Expose()
  public method: PaymentMethodType;

  @Expose()
  public status: PaymentStatusType;
}
