import { NhkClient } from "./NhkClient.ts";
import { env } from "../../env.ts";
import { Repository } from "../common/types.ts";
import { NhkApi } from "../schema.ts";
import { assertSpyCalls, returnsNext, stub } from "@std/testing/mock";
import { assertEquals, assertRejects } from "@std/assert";
import { ApiClientError } from "../common/exception.ts";

function setup(apikey: string) {
  const mockRepository: Repository<NhkApi> = {
    async get() {
      return await Promise.resolve({
        area: "横浜",
        services: ["g1", "e1"],
        nhkApiKey: apikey,
      });
    },
    async save(_) {},
  };
  return { mockRepository };
}

Deno.test("NhkClient", async (t) => {
  await t.step({
    name: "actual",
    ignore: true,
    fn: async () => {
      const { mockRepository } = setup(env("TEST_NHK_API_KEY"));

      const nhkClient = new NhkClient(mockRepository);
      const res = await nhkClient.fetchPrograms("2025-01-19"); // TODO: テスト実行日の日付を取得させる
      console.log(res);
    },
  });

  await t.step("NHK総合とEテレの番組情報を取得できる", async () => {
    const { mockRepository } = setup("dummy-api-key");

    const g1Reponse =
      (await import("../testdata/input_20250119_g1_yokohama.json", {
        with: { type: "json" },
      })).default;
    const e1Response =
      (await import("../testdata/input_20250119_e1_yokohama.json", {
        with: { type: "json" },
      })).default;

    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(Response.json(g1Reponse)),
        Promise.resolve(Response.json(e1Response)),
      ]),
    );

    const nhkClient = new NhkClient(mockRepository);
    const programs = await nhkClient.fetchPrograms("2025-01-19");

    // fetchが2回呼ばれているか
    assertSpyCalls(fetchStub, 2);

    // programsの結果が一致しているか
    const expectPrograms =
      (await import("../testdata/expect_20250119_programs.json", {
        with: { type: "json" },
      })).default.result;
    assertEquals(programs, expectPrograms);
  });

  await t.step("400エラーのとき例外を送出", async () => {
    const { mockRepository } = setup("dummy-api-key");

    using _ = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(Response.json("dummy", {
          status: 400,
        })),
      ]),
    );

    const nhkClient = new NhkClient(mockRepository);

    const apiClientError = await assertRejects(async () => {
      await nhkClient.fetchPrograms("2025-01-19");
    }, ApiClientError);
    console.log(apiClientError.message);
  });
});
