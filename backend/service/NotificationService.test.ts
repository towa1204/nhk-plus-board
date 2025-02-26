import { ILineClient } from "../client/LineClient.ts";
import { NotificationService } from "./NotificationService.ts";
import { WatchProgram } from "../client/nhk_types.ts";
import { assertSpyCallAsync, assertSpyCalls, spy } from "@std/testing/mock";
import { allWatchPrograms } from "../testdata/sample.ts";

Deno.test("NotificationService", async (t) => {
  const mockLineClient: ILineClient = {
    send: async (message: string) => {
      console.log(message);
      return await Promise.resolve();
    },
  };

  await t.step("executeで送信するメッセージが正しい", async () => {
    using lineClientSpy = spy(mockLineClient, "send");

    const notificationService = new NotificationService(mockLineClient);
    await notificationService.execute(allWatchPrograms);

    await assertSpyCallAsync(lineClientSpy, 0, {
      args: [
        "[1] 01/19 05:00 ~ 01/19 06:00\n" +
        "こころの時代選　宮沢賢治　久遠の宇宙に生きる（４）あまねく「いのち」を見つめて\n\n" +
        "[2] 01/19 03:55 ~ 01/19 04:20\n" +
        "大相撲（２０２５年）　幕内の全取組　初場所　七日目",
      ],
    });
    assertSpyCalls(lineClientSpy, 1);
  });

  await t.step("視聴番組が1件もないときは何も送信しない", async () => {
    const programs: WatchProgram[] = [];
    using lineClientSpy = spy(mockLineClient, "send");

    const notificationService = new NotificationService(mockLineClient);
    await notificationService.execute(programs);

    assertSpyCalls(lineClientSpy, 0);
  });
});
