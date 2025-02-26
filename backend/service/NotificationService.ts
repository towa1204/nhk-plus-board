import { ILineClient } from "../client/LineClient.ts";
import { WatchProgram } from "../client/nhk_types.ts";
import { toJSTMMDDhhmmFormat } from "../common/date.ts";

export interface INotificationService {
  execute: (programs: WatchProgram[]) => Promise<void>;
}

export class NotificationService implements INotificationService {
  private readonly notificationClient: ILineClient;

  constructor(notificationClient: ILineClient) {
    this.notificationClient = notificationClient;
  }

  public async execute(programs: WatchProgram[]) {
    if (programs.length === 0) {
      console.log("通知対象の番組がありません");
      return;
    }
    const message = this.buildMessage(programs);
    console.log(message);
    await this.notificationClient.send(message);
  }

  private buildMessage(programs: WatchProgram[]) {
    const message = programs.map((program, index) => {
      const startMMDDhhmm = toJSTMMDDhhmmFormat(program.start_time);
      const endMMDDhhmm = toJSTMMDDhhmmFormat(program.end_time);
      return [
        `[${index + 1}] ${startMMDDhhmm} ~ ${endMMDDhhmm}`,
        `${program.title}`,
      ].join("\n");
    }).join("\n\n");

    return message;
  }
}
