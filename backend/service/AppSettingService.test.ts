import { setTestDataFromFile } from "../common/kv_test_helper.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { assertEquals } from "@std/assert";
import { AppSettingRepository } from "../repository/AppSettingRepository.ts";
import { AppSettingService } from "./AppSettingService.ts";

async function setup() {
  const kv = await Deno.openKv(":memory:");
  const repository = new AppSettingRepository(kv);
  await setTestDataFromFile(
    kv,
    KV_KEYS.APPSETTING,
    "backend/testdata/example_appsetting.json",
  );
  return { kv, repository };
}

Deno.test("AppSettingService", async (t) => {
  await t.step("データを取得できる", async () => {
    const { kv, repository } = await setup();

    const service = new AppSettingService(repository);
    const result = await service.get();
    assertEquals(result, {
      "selectNow": "LINE",
      "LineApi": {
        "userid": "user-id",
        "accessToken": "access-token",
      },
    });

    kv.close();
  });

  await t.step("useridを変更できる", async () => {
    const { kv, repository } = await setup();

    const service = new AppSettingService(repository);
    const result = await service.validateAndSave({
      "selectNow": "LINE",
      "LineApi": {
        "userid": "user-id-changed",
        "accessToken": "access-token",
      },
    });
    assertEquals(result.success, true);
    assertEquals(result.message, null);

    kv.close();
  });

  await t.step("accessTokenがなくバリデーションエラー", async () => {
    const { kv, repository } = await setup();

    const service = new AppSettingService(repository);
    const result = await service.validateAndSave({
      "selectNow": "LINE",
      "LineApi": {
        "userid": "user-id",
      },
    });
    assertEquals(result.success, false);
    assertEquals(result.message, ["LineApi.accessToken: Required"]);

    kv.close();
  });
});
