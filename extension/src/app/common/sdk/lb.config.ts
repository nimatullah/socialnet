/* tslint:disable */
/**
* @module LoopBackConfig
* @description
*
* The LoopBackConfig module help developers to externally 
* configure the base url and api version for loopback.io
*
* Example
*
* import { LoopBackConfig } from './sdk';
* 
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     LoopBackConfig.setBaseURL('http://localhost:3000');
*     LoopBackConfig.setApiVersion('api');
*   }
* }
**/
export class LoopBackConfig {
  private static path: string = 'http://localhost:3000';
  private static version: string | number = 'api';
  private static authPrefix: string = '';
  private static debug: boolean = true;
  private static filterOn: string = 'headers';

  public static setApiVersion(version: string = 'api'): void {
    LoopBackConfig.version = version;
  }
  
  public static getApiVersion(): string | number {
    return LoopBackConfig.version;
  }

  public static setBaseURL(url: string = '/'): void {
    LoopBackConfig.path = url;
  }
  
  public static getPath(): string {
    return LoopBackConfig.path;
  }

  public static setAuthPrefix(authPrefix: string = ''): void {
    LoopBackConfig.authPrefix = authPrefix;
  }

  public static getAuthPrefix(): string {
    return LoopBackConfig.authPrefix;
  }

  public static setDebugMode(isEnabled: boolean): void {
    LoopBackConfig.debug = isEnabled;
  }

  public static debuggable(): boolean {
    return LoopBackConfig.debug;
  }

  public static filterOnUrl(): void {
    LoopBackConfig.filterOn = 'url';
  }

  public static filterOnHeaders(): void {
    LoopBackConfig.filterOn = 'headers';
  }

  public static isHeadersFilteringSet(): boolean {
    return (LoopBackConfig.filterOn === 'headers');
  }
}

