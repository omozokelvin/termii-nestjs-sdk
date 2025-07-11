import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayMinSize,
  ValidateIf,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';
import { MediaDto } from './media.dto';

export class SendMessageDto {
  /**
   * The destination phone number(s). Can be a single number in a string
   * or an array of numbers in strings.
   * e.g. '2347010000000' or ['2347010000000', '2347010000001']
   */
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsString({ each: true })
  to: string | string[];

  /**
   * The message to be sent.
   */
  @IsString()
  @IsNotEmpty()
  sms: string;

  /**
   * The channel to send the message through. Defaults to 'generic'.
   */
  @IsOptional()
  @IsIn(['dnd', 'whatsapp', 'generic'])
  channel?: 'dnd' | 'whatsapp' | 'generic';

  /**
   * The type of message. Defaults to 'plain'.
   */
  @IsOptional()
  @IsIn(['plain'])
  type?: 'plain';

  /**
   * Media object for WhatsApp messages.
   * This is only validated if the channel is 'whatsapp'.
   */
  @IsOptional()
  @ValidateIf((o) => o.channel === 'whatsapp')
  @ValidateNested()
  @Type(() => MediaDto)
  media?: MediaDto;
}
