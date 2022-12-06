import { Length } from 'class-validator';

export class UpdatePostDto {
  id: number;
  @Length(1, 1500, { message: 'Текст должен быть минимум 1 символ' })
  text: string;
}
