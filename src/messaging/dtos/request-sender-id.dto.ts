import { IsNotEmpty, IsString } from 'class-validator';

export class RequestSenderIdDto {
  @IsString()
  @IsNotEmpty()
  sender_id: string;

  @IsString()
  @IsNotEmpty()
  usecase: string;

  @IsString()
  @IsNotEmpty()
  company: string;
}
