import { env } from "../../env.ts";
import { LineClient } from "./LineClient.ts";
import { returnsNext, stub } from "@std/testing/mock";
import { assertRejects } from "@std/assert";
import { ApiClientError } from "../common/exception.ts";
import { watchProgramResult } from "../testdata/example.ts";

Deno.test("LineClient", async (t) => {
  await t.step({
    name: "actual send",
    ignore: true,
    fn: async () => {
      const lineClient = new LineClient({
        userid: env("LINE_API_USER_ID"),
        accessToken: env("LINE_API_TOKEN"),
      });
      await lineClient.send(watchProgramResult);
    },
  });

  await t.step("送信できる", async () => {
    using _ = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(Response.json("dummy", { status: 200 })),
      ]),
    );

    const lineClient = new LineClient({
      userid: "dummy-user-id",
      accessToken: "dummy-token",
    });
    await lineClient.send(watchProgramResult);
  });

  await t.step("400エラーのとき例外を送出する", async () => {
    using _ = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(Response.json("dummy", { status: 400 })),
      ]),
    );

    const lineClient = new LineClient({
      userid: "dummy-user-id",
      accessToken: "dummy-token",
    });
    const apiClientError = await assertRejects(async () => {
      await lineClient.send(watchProgramResult);
    }, ApiClientError);

    console.log(apiClientError.message);
  });
});
