import { formatPeriod } from "../common/date.ts";
import { ApiClientError } from "../common/exception.ts";
import { NotificationClient } from "../common/types.ts";
import { messageHeader } from "../common/util.ts";
import { WatchProgramResult } from "../model.ts";

export class DiscordClient implements NotificationClient {
  private readonly webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  public async send(programs: WatchProgramResult[]): Promise<void> {
    if (programs.length === 0) return;

    const message = this.buildMessage(programs);
    console.log("Discord Webhook APIへ送信するメッセージ: \n", message);

    const payload = {
      content: message,
    };

    const res = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new ApiClientError({
        url: this.webhookUrl,
        status: res.status,
        responseBody: await res.text(),
        message: `Discord Webhook APIへの接続に失敗しました`,
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
