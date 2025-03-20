import { LineClient } from "./client/LineClient.ts";
import { AppSettingRepository } from "./repository/AppSettingRepository.ts";
import { WatchProgramKeysRepository } from "./repository/WatchProgramKeysRepository.ts";
import { AppSettingService } from "./service/AppSettingService.ts";
import { WatchProgramKeysService } from "./service/WatchProgramKeysService.ts";
import { MainFlowService } from "./service/MainFlowService.ts";
import { NotificationService } from "./service/NotificationService.ts";
import { env } from "../env.ts";

export function createBeans(kv: Deno.Kv) {
  const appSettingRepository = new AppSettingRepository(kv);
  const programSettingRepository = new WatchProgramKeysRepository(kv);

  const appSettingService = new AppSettingService(
    appSettingRepository,
  );
  const programSettingService = new WatchProgramKeysService(
    programSettingRepository,
  );

  const lineClient = new LineClient({
    userid: env("LINE_API_USER_ID"),
    accessToken: env("LINE_API_TOKEN"),
  });

  const notificationService = new NotificationService(lineClient);

  const mainFlowService = new MainFlowService(
    // nhkProgramService,
    notificationService,
  );

  return {
    appSettingService,
    programSettingService,
    // nhkProgramService,
    notificationService,
    mainFlowService,
  };
}
