import { ConfigNhkApiRepository } from "../repository/ConfigNhkApiRepository.ts";
import { ConfigNhkApiService } from "./ConfigNhkApiService.ts";
import { setTestDataFromFile } from "../common/kv_test_helper.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { assertEquals } from "@std/assert";

async function setup() {
  const kv = await Deno.openKv(":memory:");
  const repository = new ConfigNhkApiRepository(kv);
  await setTestDataFromFile(
    kv,
    KV_KEYS.NHKAPI,
    "backend/testdata/config_nhkapi.json",
  );
  return { kv, repository };
}

Deno.test("ConfigNhkApiService", async (t) => {
  await t.step("データを取得できる", async () => {
    const { kv, repository } = await setup();

    const service = new ConfigNhkApiService(repository);
    const result = await service.get();
    assertEquals(result, {
      "area": "横浜",
      "services": [
        "g1",
        "e1",
      ],
      "nhkApiKey": "nhk-api-key",
    });

    kv.close();
  });

  await t.step("areaを100に変更できる", async () => {
    const { kv, repository } = await setup();

    const service = new ConfigNhkApiService(repository);
    const result = await service.validateAndSave({
      "area": "前橋",
      "services": [
        "g1",
        "e1",
      ],
      "nhkApiKey": "nhk-api-key",
    });
    assertEquals(result.success, true);
    assertEquals(result.message, null);

    kv.close();
  });

  await t.step("nhkApiKeyがなくバリデーションエラー", async () => {
    const { kv, repository } = await setup();

    const service = new ConfigNhkApiService(repository);
    const result = await service.validateAndSave({
      "area": "前橋",
      "services": [
        "g1",
        "e1",
      ],
    });
    assertEquals(result.success, false);
    assertEquals(result.message, ["nhkApiKey: Required"]);

    kv.close();
  });
});
