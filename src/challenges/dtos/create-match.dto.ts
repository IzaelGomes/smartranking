import { ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  def: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  result: { set: string };
}
