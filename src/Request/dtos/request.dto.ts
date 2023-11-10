import { Expose } from 'class-transformer';

export class RequestDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  reason: string;
  @Expose()
  startDate: Date;
  @Expose()
  endDate: Date;
  @Expose()
  status: string;
  @Expose()
  staffId: string;
}
