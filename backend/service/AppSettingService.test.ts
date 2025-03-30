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

Deno.test("データを取得できる", async () => {
  const { kv, repository } = await setup();

  const service = new AppSettingService(repository);
  const result = await service.get();
  assertEquals(result, {
    "notificationApp": "LINE",
    "cosenseProject": "cosense-project",
  });

  kv.close();
});

Deno.test("プロジェクト名を変更できる", async () => {
  const { kv, repository } = await setup();

  const service = new AppSettingService(repository);
  const setResult = await service.validateAndSave({
    "notificationApp": "LINE",
    "cosenseProject": "new-project",
  });
  assertEquals(setResult.success, true);
  assertEquals(setResult.message, null);

  const getResult = await repository.get();
  assertEquals(getResult, {
    "notificationApp": "LINE",
    "cosenseProject": "new-project",
  });

  kv.close();
});

Deno.test("不正な通知先を設定するとバリデーションエラー", async () => {
  const { kv, repository } = await setup();

  const service = new AppSettingService(repository);
  const result = await service.validateAndSave({
    "notificationApp": "test",
    "cosenseProject": "cosense-project",
  });
  assertEquals(result.success, false);
  assertEquals(result.message, ["notificationApp: Invalid input"]);

  kv.close();
});

Deno.test("空文字を設定すると未設定(null)扱い", async () => {
  const { kv, repository } = await setup();

  const service = new AppSettingService(repository);
  const validateResult = await service.validateAndSave({
    "notificationApp": "",
    "cosenseProject": "",
  });
  assertEquals(validateResult.success, true);
  assertEquals(validateResult.message, null);

  const result = await repository.get();
  assertEquals(result, {
    "notificationApp": null,
    "cosenseProject": null,
  });

  kv.close();
});
