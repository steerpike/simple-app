import { Controller, Get, Query } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller('identity')
export class AppController {
  private nuids: string[];

  constructor() {
    const dataPath = join(__dirname, '..', 'nuids.json');
    const data = readFileSync(dataPath, 'utf8');
    this.nuids = JSON.parse(data);
  }

  @Get()
  async getIdentity(@Query('mock') mock: string) {
    if (mock === 'true') {
      /*const shouldDelay = Math.random() < 0.33;
      if (shouldDelay) {
        const delay = Math.floor(Math.random() * (10000 - 4000 + 1) + 4000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }*/
      const randomIndex = Math.floor(Math.random() * this.nuids.length);
      const nuid = this.nuids[randomIndex];
      return { nuid };
    }
    return 0;
  }
}
