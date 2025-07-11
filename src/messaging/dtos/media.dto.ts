import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class MediaDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  caption: string;
}