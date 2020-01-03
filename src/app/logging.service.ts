import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LoggingService {
  lastlog: string;

  printLog(message: string) {
    console.log(message);
    console.log(`previous: ${this.lastlog}`);
    this.lastlog = message;
  }
}
