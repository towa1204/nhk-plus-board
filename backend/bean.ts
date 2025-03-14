import { LineClient } from "./client/LineClient.ts";
import { NhkClient } from "./client/NhkClient.ts";
import { ConfigNhkApiRepository } from "./repository/ConfigNhkApiRepository.ts";
import { AppSettingRepository } from "./repository/AppSettingRepository.ts";
import { ProgramSettingRepository } from "./repository/ProgramSettingRepository.ts";
import { ConfigNhkApiService } from "./service/ConfigNhkApiService.ts";
import { AppSettingService } from "./service/AppSettingService.ts";
import { ProgramSettingService } from "./service/ProgramSettingService.ts";
import { MainFlowService } from "./service/MainFlowService.ts";
import { NhkProgramService } from "./service/NhkProgramService.ts";
import { NotificationService } from "./service/NotificationService.ts";

export function createBeans(kv: Deno.Kv) {
  const configNhkApiRepository = new ConfigNhkApiRepository(kv);
  const appSettingRepository = new AppSettingRepository(kv);
  const programSettingRepository = new ProgramSettingRepository(kv);

  const configNhkApiService = new ConfigNhkApiService(configNhkApiRepository);
  const appSettingService = new AppSettingService(
    appSettingRepository,
  );
  const programSettingService = new ProgramSettingService(
    programSettingRepository,
  );

  const nhkClient = new NhkClient(configNhkApiRepository);
  const lineClient = new LineClient(appSettingRepository);
  const nhkProgramService = new NhkProgramService(
    nhkClient,
    programSettingRepository,
  );
  const notificationService = new NotificationService(lineClient);

  const mainFlowService = new MainFlowService(
    nhkProgramService,
    notificationService,
  );

  return {
    configNhkApiService,
    appSettingService,
    programSettingService,
    nhkProgramService,
    notificationService,
    mainFlowService,
  };
}

const kv = Deno.env.get("KV_PATH") === undefined
  ? await Deno.openKv()
  : await Deno.openKv(Deno.env.get("KV_PATH")!);

export const {
  configNhkApiService,
  appSettingService,
  programSettingService,
  nhkProgramService,
  notificationService,
  mainFlowService,
} = createBeans(kv);
