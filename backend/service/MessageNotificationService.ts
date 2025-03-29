import { NotificationClient, Repository } from "../common/types.ts";
import { AppSetting, WatchProgramResult } from "../model.ts";

type NotificationTarget = NonNullable<AppSetting["notificationTarget"]>;

/**
 * 番組情報を通知するサービス
 * 設定値に応じて、LINEまたはDiscordに通知する
 * 通知先が設定されていない場合は何もしない
 */
export class MessageNotificationService {
  private readonly notificationClients: Map<
    NotificationTarget,
    NotificationClient
  >;
  private readonly appSettingRepository: Repository<AppSetting>;

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

  async execute(programs: WatchProgramResult[]): Promise<void> {
    const appSetting = await this.appSettingRepository.get();
    if (appSetting.notificationTarget === null) {
      console.log("通知先が設定されていないため、通知しません");
      return;
    }

    const notificationClient = this.notificationClients.get(
      appSetting.notificationTarget,
    );
    if (notificationClient === undefined) return;

    await notificationClient.send(programs);
  }
}
