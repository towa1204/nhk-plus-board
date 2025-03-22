import { createBeans } from "./bean.ts";
import { KV_KEYS } from "./common/kv_key.ts";
import { setTestDataFromFile } from "./common/kv_test_helper.ts";

const kv = Deno.env.get("KV_PATH") === undefined
  ? await Deno.openKv()
  : await Deno.openKv(Deno.env.get("KV_PATH")!);

await setTestDataFromFile(
  kv,
  KV_KEYS.PROGRAMS,
  "backend/testdata/example_watchprogramkeys.json",
);

export const {
  appSettingService,
  watchProgramKeysService,
  nhkPlusProgramService,
} = createBeans(kv);
