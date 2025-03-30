import { env } from "../../env.ts";
import { LineClient } from "./LineClient.ts";
import { returnsNext, stub } from "@std/testing/mock";
import { assertRejects } from "@std/assert";
import { ApiClientError } from "../common/exception.ts";

Deno.test.ignore("動作確認用のテスト", async () => {
  const lineClient = new LineClient({
    userid: env("LINE_API_USER_ID"),
    accessToken: env("LINE_API_TOKEN"),
  });
  await lineClient.send("わいわい");
});

Deno.test("送信できる", async () => {
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
  await lineClient.send("わいわい");
});

Deno.test("400エラーのとき例外を送出する", async () => {
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
    await lineClient.send("わいわい");
  }, ApiClientError);

  console.log(apiClientError.message);
});
