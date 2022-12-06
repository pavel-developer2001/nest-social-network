import { Length } from 'class-validator';

export class UpdatePostDto {
  @Length(1, 1500, { message: 'Текст должен быть минимум 1 символ' })
  text: string;
}
