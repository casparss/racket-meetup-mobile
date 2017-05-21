import { Injectable } from '@angular/core';

declare var __CONFIG__: string;

@Injectable()
export class ConfigSvc {
  private config = __CONFIG__;
  get(key){
    return this.config[key];
  }
}
