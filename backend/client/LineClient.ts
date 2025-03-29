import { formatPeriod } from "../common/date.ts";
import { ApiClientError } from "../common/exception.ts";
import { NotificationClient } from "../common/types.ts";
import { messageHeader } from "../common/util.ts";
import { WatchProgramResult } from "../model.ts";
export class LineClient implements NotificationClient {
  private static readonly MESSAGING_API_BASE_PATH = "https://api.line.me/v2";

  private readonly userid: string;
  private readonly accessToken: string;

  constructor(lineApiConfig: { userid: string; accessToken: string }) {
    this.userid = lineApiConfig.userid;
    this.accessToken = lineApiConfig.accessToken;
  }

  public async send(programs: WatchProgramResult[]): Promise<void> {
    if (programs.length === 0) return;

    const message = this.buildMessage(programs);
    console.log("LINE APIへ送信するメッセージ: \n", message);

    const payload = {
      to: this.userid,
      messages: [{
        type: "text",
        text: message,
      }],
    };

    const url = `${LineClient.MESSAGING_API_BASE_PATH}/bot/message/push`;
    const res = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      throw new ApiClientError({
        url,
        status: res.status,
        responseBody: await res.text(),
        message: `LINE Messaging Push APIへの接続に失敗しました`,
      });
    }
    await res.body?.cancel();
  }

  private buildMessage(programs: WatchProgramResult[]): string {
    const messages = programs.map((program) => {
      const streamablePrograms = program.streamablePrograms.map(
        (streamableProgram) => {
          return `${
            formatPeriod(
              streamableProgram.published_period_from,
              streamableProgram.published_period_to,
            )
          }\n${streamableProgram.title}`;
        },
      );
      return `${streamablePrograms.join("\n\n")}`;
    });
    return messageHeader + messages.join("\n\n");
  }
}
