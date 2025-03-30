import { returnsNext, stub } from "@std/testing/mock";
import { DiscordClient } from "./DiscordClient.ts";
import { assertRejects } from "$std/assert/assert_rejects.ts";
import { ApiClientError } from "../common/exception.ts";
import { env } from "../../env.ts";

Deno.test.ignore("動作確認用のテスト", async () => {
  const discordClient = new DiscordClient(
    env("DISCORD_WEBHOOK_URL"),
  );
  await discordClient.send("わいわい");
});

Deno.test("送信できる", async () => {
  using _ = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(Response.json("dummy", { status: 200 })),
    ]),
  );

  const discordClient = new DiscordClient("dummy-webhook-url");
  await discordClient.send("わいわい");
});

Deno.test("400エラーのとき例外を送出する", async () => {
  using _ = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(Response.json("dummy", { status: 400 })),
    ]),
  );

  const discordClient = new DiscordClient("dummy-webhook-url");
  const apiClientError = await assertRejects(async () => {
    await discordClient.send("わいわい");
  }, ApiClientError);

  console.log(apiClientError.message);
});
