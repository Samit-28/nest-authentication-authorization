/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString({ each: true })
  flavors: string[];

  @IsNotEmpty()
  @IsEnum(['Hot', 'Iced', 'Blended'], {
    message:
      'coffeeType must be one of the following values: Hot, Iced, Blended',
  })
  coffeeType: 'Hot' | 'Iced' | 'Blended';
}
