import { ApiClientError } from "../common/exception.ts";
import { NotificationClient } from "../common/types.ts";

export class DiscordClient implements NotificationClient {
  private readonly webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  /**
   * WebhookでDiscordチャンネルにメッセージを送信する
   * @param message メッセージ
   * @throws ApiClientError
   */
  public async send(message: string): Promise<void> {
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
  }
}
