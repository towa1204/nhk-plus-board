import { setTestDataMultipleFromObject } from "../common/kv_test_helper.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { createBeans } from "../bean.ts";
import { env } from "../../env.ts";
import { today, week } from "../common/date.ts";

async function setup() {
  const kv = await Deno.openKv(":memory:");
  await setTestDataMultipleFromObject(kv, [
    {
      key: KV_KEYS.PROGRAMS,
      object: {
        "programs": [
          {
            "enabled": false,
            "title": "ＮＨＫ",
          },
          {
            "enabled": true,
            "title": "クローズアップ現代",
          },
        ],
      },
    },
    {
      key: KV_KEYS.NHKAPI,
      object: {
        "area": "横浜",
        "services": [
          "g1",
          "e1",
        ],
        "nhkApiKey": env("TEST_NHK_API_KEY"),
      },
    },
    {
      key: KV_KEYS.APPSETTING,
      object: {
        "selectNow": "LINE",
        "LineApi": {
          "userid": env("TEST_LINE_API_USER_ID"),
          "accessToken": env("TEST_LINE_API_TOKEN"),
        },
      },
    },
  ]);
  const { mainFlowService } = createBeans(kv);
  return { kv, mainFlowService };
}

Deno.test("MainFlowService", async (t) => {
  await t.step({
    name: "actual today",
    ignore: true,
    fn: async () => {
      const { kv, mainFlowService } = await setup();

      await mainFlowService.execute([today(new Date())]);

      kv.close();
    },
  });

  await t.step({
    name: "actual week",
    ignore: true,
    fn: async () => {
      const { kv, mainFlowService } = await setup();

      await mainFlowService.execute(week(new Date()));

      kv.close();
    },
  });
});
