import { IsUrl, Length } from 'class-validator';

export class CreateDto {
  @IsUrl()
  @Length(5, 10)
  longUrl: string;
}
