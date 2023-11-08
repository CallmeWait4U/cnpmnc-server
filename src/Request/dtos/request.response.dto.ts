import { Expose } from 'class-transformer';

export class RequestResponseDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  numLeaveDays: number;
  @Expose()
  startDate: Date;
  @Expose()
  endDate: Date;
  @Expose()
  reason: string;
  @Expose()
  status: string;
}
