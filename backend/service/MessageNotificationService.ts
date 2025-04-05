import { NotificationClient, Repository } from "../common/types.ts";
import { AppSetting, RecentPrograms, WatchProgram } from "../model.ts";
import { formatPeriod } from "../common/date.ts";

type NotificationTarget = NonNullable<AppSetting["notificationApp"]>;
export type IMessageNotificationService = {
  execute: (programs: RecentPrograms) => Promise<void>;
};

/**
 * 番組情報を通知するサービス
 * 設定値に応じて、LINEまたはDiscordに通知する
 * 通知先が設定されていない場合は何もしない
 */
export class MessageNotificationService implements IMessageNotificationService {
  private readonly notificationClients: Map<
    NotificationTarget,
    NotificationClient
  >;
  private readonly appSettingRepository: Repository<AppSetting>;

  private readonly MESSAGE_HEADER =
    "直近に公開開始した番組もしくは公開終了する番組です。\n" +
    "https://nhk-plus-board.deno.dev/programs/list";

  constructor(
    lineClient: NotificationClient,
    discordClient: NotificationClient,
    appSettingRepository: Repository<AppSetting>,
  ) {
    this.notificationClients = new Map<
      NotificationTarget,
      NotificationClient
    >([
      ["LINE", lineClient],
      ["Discord", discordClient],
    ]);
    this.appSettingRepository = appSettingRepository;
  }

  async execute(programs: RecentPrograms): Promise<void> {
    if (programs.started.length === 0 && programs.willEnd.length === 0) {
      console.log("通知する番組がないため、通知しません");
      return;
    }

    const appSetting = await this.appSettingRepository.get();
    if (appSetting.notificationApp === null) {
      console.log("通知先が設定されていないため、通知しません");
      return;
    }

    const notificationClient = this.notificationClients.get(
      appSetting.notificationApp,
    );
    if (notificationClient === undefined) return;

    await notificationClient.send(this.buildMessage(programs));
  }

  private buildMessage(programs: RecentPrograms): string {
    return [
      this.MESSAGE_HEADER,
      this.formatPrograms("📺 配信が始まった番組:", programs.started),
      this.formatPrograms("⌛ まもなく終了する番組:", programs.willEnd),
    ].filter(Boolean).join("\n\n");
  }

  private formatPrograms(header: string, list: WatchProgram[]): string | null {
    if (!list.length) return null;
    const body = list.map((p) =>
      `${
        formatPeriod(p.published_period_from, p.published_period_to)
      }\n${p.title}`
    ).join("\n");
    return `${header}\n${body}`;
  }
}
