import { createBeans } from "./bean.ts";

const kv = Deno.env.get("KV_PATH") === undefined
  ? await Deno.openKv()
  : await Deno.openKv(Deno.env.get("KV_PATH")!);

export const {
  appSettingService,
  watchProgramKeysService,
  nhkPlusProgramService,
} = createBeans(kv);
