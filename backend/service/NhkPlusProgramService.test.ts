import { NhkPlusClient } from "../client/NhkPlusClient.ts";
import { Repository } from "../common/types.ts";
import { WatchProgramKeys } from "../model.ts";
import { NhkPlusProgramService } from "./NhkPlusProgramService.ts";

Deno.test.ignore("【動作検証用】番組情報を取得できる", async () => {
  const programKeys = {
    programs: [
      {
        enabled: true,
        title: "１００分ｄｅ名著",
      },
      {
        enabled: true,
        title: "えぇトコ",
      },
    ],
  };

  const mockRepository: Repository<WatchProgramKeys> = {
    async get() {
      return await Promise.resolve(programKeys);
    },
    save() {
      return;
    },
  };
  const nhkPlusClient = new NhkPlusClient();

  const service = new NhkPlusProgramService(mockRepository, nhkPlusClient);
  await service.fetchPrograms();
});
