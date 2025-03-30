import { assertSpyCalls, spy } from "@std/testing/mock";
import { MessageNotificationService } from "./MessageNotificationService.ts";
import {
  sampleWatchProgram01,
  sampleWatchProgram02,
} from "../testdata/example.ts";

Deno.test("MessageNotificationService", async (t) => {
  const createService = (notificationApp: "LINE" | "Discord" | null) => {
    const appSettingRepository = {
      get: async () => (await {
        notificationApp,
        cosenseProject: null,
      }),
      save: async () => {},
    };
    const lineClient = {
      send: spy(async (message: string) => {
        console.log(message);
        await Promise.resolve();
      }),
    };
    const discordClient = {
      send: spy(async (message: string) => {
        console.log(message);
        await Promise.resolve();
      }),
    };

    const service = new MessageNotificationService(
      lineClient,
      discordClient,
      appSettingRepository,
    );

    return { service, lineClient, discordClient };
  };

  const cases = [
    {
      name: "設定値がない場合は何もしない",
      target: null,
      expected: { lineCalls: 0, discordCalls: 0 },
      programs: {
        started: sampleWatchProgram01,
        willEnd: [],
      },
    },
    {
      name: "番組がないとき通知しない",
      target: "LINE" as const,
      expected: { lineCalls: 0, discordCalls: 0 },
      programs: {
        started: [],
        willEnd: [],
      },
    },
    {
      name: "LINE通知先が設定されている場合、LINEに通知する",
      target: "LINE" as const,
      expected: { lineCalls: 1, discordCalls: 0 },
      programs: {
        started: sampleWatchProgram01,
        willEnd: [],
      },
    },
    {
      name: "Discord通知先が設定されている場合、Discordに通知する",
      target: "Discord" as const,
      expected: { lineCalls: 0, discordCalls: 1 },
      programs: {
        started: [],
        willEnd: sampleWatchProgram02,
      },
    },
    {
      name: "配信開始番組、配信終了予定番組が両方とも存在する",
      target: "Discord" as const,
      expected: { lineCalls: 0, discordCalls: 1 },
      programs: {
        started: sampleWatchProgram01,
        willEnd: sampleWatchProgram02,
      },
    },
  ];

  for (const { name, target, expected, programs } of cases) {
    await t.step(name, async () => {
      const { service, lineClient, discordClient } = createService(target);
      await service.execute(programs);

      assertSpyCalls(lineClient.send, expected.lineCalls);
      assertSpyCalls(discordClient.send, expected.discordCalls);
    });
  }
});
