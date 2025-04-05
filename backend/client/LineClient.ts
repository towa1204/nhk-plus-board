import { ApiClientError } from "../common/exception.ts";
import { NotificationClient } from "../common/types.ts";
export class LineClient implements NotificationClient {
  private static readonly MESSAGING_API_PATH =
    "https://api.line.me/v2/bot/message/push";

  private readonly userid: string;
  private readonly accessToken: string;

  constructor(lineApiConfig: { userid: string; accessToken: string }) {
    this.userid = lineApiConfig.userid;
    this.accessToken = lineApiConfig.accessToken;
  }

  /**
   * LINE Messaging APIでメッセージを送信する
   * @param message メッセージ
   * @throws ApiClientError
   */
  public async send(message: string): Promise<void> {
    console.log("LINE APIへ送信するメッセージ: \n", message);

    const payload = {
      to: this.userid,
      messages: [{
        type: "text",
        text: message,
      }],
    };

    const res = await fetch(
      LineClient.MESSAGING_API_PATH,
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
        url: LineClient.MESSAGING_API_PATH,
        status: res.status,
        responseBody: await res.text(),
        message: `LINE Messaging Push APIへの接続に失敗しました`,
      });
    }
    await res.body?.cancel();
  }
}
