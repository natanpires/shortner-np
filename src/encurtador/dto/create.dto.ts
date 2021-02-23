import { IsUrl, Length } from 'class-validator';

export class CreateDto {
  @IsUrl()
  @Length(5, 2000)
  longUrl: string;
}
