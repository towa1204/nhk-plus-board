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
      "notificationTarget": "LINE",
      "cosenseProject": "cosense-project",
    });

    kv.close();
  });

  await t.step("プロジェクト名を変更できる", async () => {
    const { kv, repository } = await setup();

    const service = new AppSettingService(repository);
    const result = await service.validateAndSave({
      "notificationTarget": "LINE",
      "cosenseProject": "new-project",
    });
    assertEquals(result.success, true);
    assertEquals(result.message, null);

    kv.close();
  });

  await t.step("存在しない通知先でバリデーションエラー", async () => {
    const { kv, repository } = await setup();

    const service = new AppSettingService(repository);
    const result = await service.validateAndSave({
      "notificationTarget": "test",
      "cosenseProject": "cosense-project",
    });
    assertEquals(result.success, false);
    assertEquals(result.message, ["notificationTarget: Invalid input"]);

    kv.close();
  });

  await t.step("空文字が指定されたとき未設定(null)扱い", async () => {
    const { kv, repository } = await setup();

    const service = new AppSettingService(repository);
    const validateResult = await service.validateAndSave({
      "notificationTarget": "",
      "cosenseProject": "",
    });
    assertEquals(validateResult.success, true);
    assertEquals(validateResult.message, null);

    const result = await repository.get();
    assertEquals(result, {
      "notificationTarget": null,
      "cosenseProject": null,
    });

    kv.close();
  });
});
