import { assertSpyCall, spy } from "@std/testing/mock";
import { RecentProgramNotifcationService } from "./RecentProgramNotifcationService.ts";
import { RecentPrograms, WatchProgram } from "../model.ts";
import { INhkPlusProgramService } from "./NhkPlusProgramService.ts";

function createStream(from: Date, to: Date): WatchProgram {
  return {
    title: "テスト番組",
    published_period_from: from.toISOString(),
    published_period_to: to.toISOString(),
    subtitle: "サブタイトル",
    content: "番組内容",
    series_url: "https://www.nhk.jp/p/test",
    stream_url: "https://plus.nhk.jp/watch/test",
    thumbnail: "https://www.nhk.jp/img/test.jpg",
  };
}

function createProgramResult(streams: WatchProgram[]) {
  return {
    search_keyword: "テスト",
    streams,
  };
}

Deno.test("通知すべき番組の抽出ロジック", async () => {
  const now = new Date("2025-03-29T12:00:00Z");
  const ONE_HOUR = 60 * 60 * 1000;

  // ちょうど24時間以内 → 通知されるべき
  const startAtJustWithin = createStream(
    new Date(now.getTime() - 24 * ONE_HOUR + 1), // 23:59:59前
    new Date(now.getTime() + 100 * ONE_HOUR),
  );

  // ちょうど24時間前 → 通知されない
  const startAtJustOutside = createStream(
    new Date(now.getTime() - 24 * ONE_HOUR - 1), // 24:00:01前
    new Date(now.getTime() + 100 * ONE_HOUR),
  );

  // 終了がちょうど24時間以内 → 通知されるべき
  const endAtJustWithin = createStream(
    new Date(now.getTime() - 100 * ONE_HOUR),
    new Date(now.getTime() + 24 * ONE_HOUR - 1), // 23:59:59後
  );

  // 終了がちょうど24時間後 → 通知されない
  const endAtJustOutside = createStream(
    new Date(now.getTime() - 100 * ONE_HOUR),
    new Date(now.getTime() + 24 * ONE_HOUR + 1), // 24:00:01後
  );

  const nhkPlusProgramService: INhkPlusProgramService = {
    fetchPrograms: () => {
      return Promise.resolve([
        createProgramResult([
          startAtJustWithin,
          startAtJustOutside,
          endAtJustWithin,
          endAtJustOutside,
        ]),
      ]);
    },
  };

  const messageNotificationService = {
    execute: spy(async (_programs: RecentPrograms) => {
      await Promise.resolve();
    }),
  };

  const service = new RecentProgramNotifcationService(
    nhkPlusProgramService,
    messageNotificationService,
  );

  await service.execute(now);

  assertSpyCall(messageNotificationService.execute, 0, {
    args: [{
      started: [startAtJustWithin],
      willEnd: [endAtJustWithin],
    }],
  });
});
