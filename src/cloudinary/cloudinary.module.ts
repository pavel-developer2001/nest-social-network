import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from 'src/chat/chat.module';
import { PostModule } from 'src/post/post.module';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    forwardRef(() => PostModule),
    forwardRef(() => ChatModule),
    ConfigModule,
  ],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
