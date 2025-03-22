import { NhkPlusClient } from "../client/NhkPlusClient.ts";
import { Repository } from "../common/types.ts";
import { WatchProgramKeys } from "../model.ts";
import { NhkPlusProgramService } from "./NhkPlusProgramService.ts";

Deno.test("NhkPlusProgramService", async (t) => {
  await t.step({
    name: "番組情報を取得できる",
    ignore: true,
    fn: async () => {
      const mockRepository: Repository<WatchProgramKeys> = {
        async get() {
          return await Promise.resolve({
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
          });
        },
        save() {
          return;
        },
      };

      const nhkPlusClient = new NhkPlusClient();
      const service = new NhkPlusProgramService(mockRepository, nhkPlusClient);

      await service.fetchPrograms();
    },
  });
});
