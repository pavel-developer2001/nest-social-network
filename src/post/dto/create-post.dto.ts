import { Length } from 'class-validator';

export class CreatePostDto {
  @Length(0, 1500, { message: 'Пароль должен минимум 6 символов' })
  text: string;
}
