import { returnsNext, stub } from "@std/testing/mock";
import { assertEquals, assertRejects } from "@std/assert";
import { ApiClientError } from "../common/exception.ts";
import { NhkPlusClient } from "./NhkPlusClient.ts";

Deno.test("NhkPlusClient", async (t) => {
  await t.step({
    name: "actual send",
    ignore: true,
    fn: async () => {
      const nhkPlusClient = new NhkPlusClient();
      const res = await nhkPlusClient.searchPrograms("NHK");
      console.log(res);
      console.log(`番組数: ${res.body.length}`);
    },
  });

  await t.step("送信できる", async () => {
    const expectedResponse = JSON.parse(
      await Deno.readTextFile("backend/testdata/search_result_001.json"),
    );

    using _ = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(Response.json(expectedResponse, { status: 200 })),
      ]),
    );

    const nhkPlusClient = new NhkPlusClient();
    const result = await nhkPlusClient.searchPrograms("えぇトコ");
    assertEquals(result, expectedResponse);
  });

  await t.step("400エラーのとき例外を送出する", async () => {
    using _ = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(
          Response.json({ "message": "Invalid Request." }, { status: 400 }),
        ),
      ]),
    );

    const nhkPlusClient = new NhkPlusClient();
    const apiClientError = await assertRejects(async () => {
      await nhkPlusClient.searchPrograms("");
    }, ApiClientError);

    console.log(apiClientError.message);
  });
});
