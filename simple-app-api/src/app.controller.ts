import { Controller, Get, Query } from '@nestjs/common';

@Controller('video')
export class AppController {
  @Get()
  getVideo(@Query('userId') userId: string) {
    if (userId && userId !== '0') {
      // User is logged in
      return { url: 'https://www.youtube.com/watch?v=o1vq0bsONbc' };
    } else {
      // User is not logged in
      return { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' };
    }
  }
}
