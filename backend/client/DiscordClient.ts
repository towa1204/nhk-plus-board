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

  public async send(programResultList: WatchProgramResult[]): Promise<void> {
    if (programResultList.length === 0) return;

    const message = this.buildMessage(programResultList);
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

  private buildMessage(programResultList: WatchProgramResult[]): string {
    const messages = programResultList.map((program) => {
      const streamsMessage = program.streams.map(
        (stream) => {
          return `${
            formatPeriod(
              stream.published_period_from,
              stream.published_period_to,
            )
          }\n${stream.title}`;
        },
      );
      return `${streamsMessage.join("\n\n")}`;
    });
    return messageHeader + messages.join("\n\n");
  }
}
