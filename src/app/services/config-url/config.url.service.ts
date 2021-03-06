import { Injectable } from '@angular/core';

@Injectable()
export class ConfigUrlService {

  private config: any;
  constructor() {
    this.config = { protocol: 'http', host: 'localhost', port: '3000' }
  }

  getConfig() {
    return this.config;
  }

  getBaseUrl() {
    return `${this.config.protocol}://${this.config.host}:${this.config.port}`;
  }

}
