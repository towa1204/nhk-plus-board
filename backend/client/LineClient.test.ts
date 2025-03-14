import { env } from "../../env.ts";
import { LineClient } from "./LineClient.ts";
import { Repository } from "../common/types.ts";
import { AppSetting } from "../schema.ts";
import { returnsNext, stub } from "@std/testing/mock";
import { assertRejects } from "@std/assert";
import { ApiClientError } from "../common/exception.ts";

function setup(userid: string, accessToken: string) {
  const mockRepository: Repository<AppSetting> = {
    async get() {
      return await Promise.resolve({
        selectNow: "LINE",
        LineApi: {
          userid,
          accessToken,
        },
      });
    },
    async save(_) {},
  };
  return { mockRepository };
}

Deno.test("LineClient", async (t) => {
  await t.step({
    name: "actual send",
    ignore: true,
    fn: async () => {
      const { mockRepository } = setup(
        env("TEST_LINE_API_USER_ID"),
        env("TEST_LINE_API_TOKEN"),
      );
      const lineClient = new LineClient(mockRepository);
      await lineClient.send("わいわい");
    },
  });

  await t.step("送信できる", async () => {
    const { mockRepository } = setup("dummy-user-id", "dummy-token");

    using _ = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(Response.json("dummy", { status: 200 })),
      ]),
    );

    const lineClient = new LineClient(mockRepository);
    await lineClient.send("わいわい");
  });

  await t.step("400エラーのとき例外を送出する", async () => {
    const { mockRepository } = setup("dummy-user-id", "dummy-token");

    using _ = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve(Response.json("dummy", { status: 400 })),
      ]),
    );

    const lineClient = new LineClient(mockRepository);
    const apiClientError = await assertRejects(async () => {
      await lineClient.send("わいわい");
    }, ApiClientError);

    console.log(apiClientError.message);
  });
});
