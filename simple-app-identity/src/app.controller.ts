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
  getIdentity(@Query('mock') mock: string) {
    if (mock === 'true') {
      const randomIndex = Math.floor(Math.random() * this.nuids.length);
      const nuid = this.nuids[randomIndex];
      return { nuid };
    }
    return 0;
  }
}
