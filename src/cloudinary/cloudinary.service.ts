import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { ChatService } from 'src/chat/chat.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
    @Inject(forwardRef(() => ChatService))
    private chatService: ChatService,
  ) {}
  async uploadImagePost(file: Express.Multer.File, id: number): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.postService.addPostImage(result.url, id);
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
  async uploadImageChat(file: Express.Multer.File, id: number): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.chatService.addChatImage(result.url, id);
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
}
