import { AppSettingRepository } from "./repository/AppSettingRepository.ts";
import { WatchProgramKeysRepository } from "./repository/WatchProgramKeysRepository.ts";
import { AppSettingService } from "./service/AppSettingService.ts";
import { WatchProgramKeysService } from "./service/WatchProgramKeysService.ts";
import { NhkPlusClient } from "./client/NhkPlusClient.ts";
import { NhkPlusProgramService } from "./service/NhkPlusProgramService.ts";
import { LineClient } from "./client/LineClient.ts";
import { env } from "../env.ts";
import { DiscordClient } from "./client/DiscordClient.ts";
import { MessageNotificationService } from "./service/MessageNotificationService.ts";
import { RecentProgramNotifcationService } from "./service/RecentProgramNotifcationService.ts";

export function createBeans(kv: Deno.Kv) {
  const appSettingRepository = new AppSettingRepository(kv);
  const watchProgramKeysRepository = new WatchProgramKeysRepository(kv);

  const appSettingService = new AppSettingService(
    appSettingRepository,
  );
  const watchProgramKeysService = new WatchProgramKeysService(
    watchProgramKeysRepository,
  );

  const nhkPlusClient = new NhkPlusClient();
  const nhkPlusProgramService = new NhkPlusProgramService(
    watchProgramKeysRepository,
    nhkPlusClient,
  );

  const lineClient = new LineClient({
    userid: env("LINE_API_USER_ID"),
    accessToken: env("LINE_API_TOKEN"),
  });
  const discordClient = new DiscordClient(env("DISCORD_WEBHOOK_URL"));

  const messageNotificationService = new MessageNotificationService(
    lineClient,
    discordClient,
    appSettingRepository,
  );

  const recentProgramNotificationService = new RecentProgramNotifcationService(
    nhkPlusProgramService,
    messageNotificationService,
  );

  return {
    appSettingService,
    watchProgramKeysService,
    nhkPlusProgramService,
    recentProgramNotificationService,
  };
}
