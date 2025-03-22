import { AppSettingRepository } from "./repository/AppSettingRepository.ts";
import { WatchProgramKeysRepository } from "./repository/WatchProgramKeysRepository.ts";
import { AppSettingService } from "./service/AppSettingService.ts";
import { WatchProgramKeysService } from "./service/WatchProgramKeysService.ts";
import { NhkPlusClient } from "./client/NhkPlusClient.ts";
import { NhkPlusProgramService } from "./service/NhkPlusProgramService.ts";

export function createBeans(kv: Deno.Kv) {
  const appSettingRepository = new AppSettingRepository(kv);
  const watchProgramKeysRepository = new WatchProgramKeysRepository(kv);

  const appSettingService = new AppSettingService(
    appSettingRepository,
  );
  const watchProgramKeysService = new WatchProgramKeysService(
    watchProgramKeysRepository,
  );

  // const lineClient = new LineClient({
  //   userid: env("LINE_API_USER_ID"),
  //   accessToken: env("LINE_API_TOKEN"),
  // });

  const nhkPlusClient = new NhkPlusClient();

  // const notificationService = new NotificationService(lineClient);

  const nhkPlusProgramService = new NhkPlusProgramService(
    watchProgramKeysRepository,
    nhkPlusClient,
  );

  return {
    appSettingService,
    watchProgramKeysService,
    nhkPlusProgramService,
    // notificationService,
    // mainFlowService,
  };
}
