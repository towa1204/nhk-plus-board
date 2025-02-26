import { assertEquals } from "@std/assert";
import { INhkClient } from "../client/NhkClient.ts";
import { Repository } from "../common/types.ts";
import { ConfigProgram } from "../schema.ts";
import { NhkProgramService } from "./NhkProgramService.ts";
import { assertSpyCalls, returnsNext, stub } from "@std/testing/mock";
import {
  allPrograms,
  allWatchPrograms,
  configProgram,
} from "../testdata/sample.ts";

Deno.test("NhkProgramService", async (t) => {
  const mockNhkApiClient: INhkClient = {
    fetchPrograms: async (_: string) => {
      return await Promise.resolve([]);
    },
  };
  await t.step("2日分の番組情報から視聴番組を抽出できている", async () => {
    using nhkApiClientStub = stub(
      mockNhkApiClient,
      "fetchPrograms",
      returnsNext([
        Promise.resolve(allPrograms),
        Promise.resolve([]),
      ]),
    );
    const mockRepository: Repository<ConfigProgram> = {
      async get() {
        return await Promise.resolve(configProgram);
      },
      async save(_) {},
    };

    const nhkProgramService = new NhkProgramService(
      mockNhkApiClient,
      mockRepository,
    );
    const programs = await nhkProgramService.listByDates([
      "2025-01-19",
      "2025-01-20",
    ]);

    assertEquals(programs, allWatchPrograms);
    assertSpyCalls(nhkApiClientStub, 2);
  });

  await t.step("番組情報がないときは何も返さない", async () => {
    const mockRepository: Repository<ConfigProgram> = {
      async get() {
        return await Promise.resolve(configProgram);
      },
      async save(_) {},
    };

    const nhkProgramService = new NhkProgramService(
      mockNhkApiClient,
      mockRepository,
    );
    const programs = await nhkProgramService.listByDates(["2025-01-19"]);

    assertEquals(programs, []);
  });

  await t.step("視聴番組がないときは何も返さない", async () => {
    using nhkApiClientStub = stub(
      mockNhkApiClient,
      "fetchPrograms",
      returnsNext([
        Promise.resolve(allPrograms),
      ]),
    );
    const mockRepository: Repository<ConfigProgram> = {
      async get() {
        return await Promise.resolve({
          programs: [],
        });
      },
      async save(_) {},
    };

    const nhkProgramService = new NhkProgramService(
      mockNhkApiClient,
      mockRepository,
    );
    const programs = await nhkProgramService.listByDates(["2025-01-19"]);

    assertEquals(programs, []);
    assertSpyCalls(nhkApiClientStub, 1);
  });
});
