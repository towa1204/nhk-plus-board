import { PlaylistResponse } from "../client/nhk_api_types.ts";
import { INhkPlusClient } from "../client/NhkPlusClient.ts";
import { Repository } from "../common/types.ts";
import { WatchProgram, WatchProgramKeys } from "../model.ts";
export interface INhkPlusProgramService {
  fetchPrograms: () => Promise<Record<string, WatchProgram[]>>;
}

export class NhkPlusProgramService implements INhkPlusProgramService {
  private readonly repository: Repository<WatchProgramKeys>;
  private readonly nhkPlusClient: INhkPlusClient;

  constructor(
    repository: Repository<WatchProgramKeys>,
    nhkPlusClient: INhkPlusClient,
  ) {
    this.repository = repository;
    this.nhkPlusClient = nhkPlusClient;
  }

  public async fetchPrograms(): Promise<Record<string, WatchProgram[]>> {
    const { programs } = await this.repository.get();

    const programList: Record<string, WatchProgram[]> = {};

    await Promise.all(
      programs
        .filter((programKey) => programKey.enabled)
        .map(async (programKey) => {
          const result = await this.nhkPlusClient.searchPrograms(
            programKey.title,
          );
          programList[programKey.title] = this.toWatchProgram(result);
        }),
    );

    console.log(programList);

    return programList;
  }

  private toWatchProgram(playlistReponse: PlaylistResponse): WatchProgram[] {
    return playlistReponse.body.map((program) => ({
      title: program.stream_type.program.title,
      published_period_from: program.published_period_from,
      published_period_to: program.published_period_to,
      subtitle: program.stream_type.program.subtitle,
      content: program.stream_type.program.content,
      series_url: program.stream_type.program.url.pc,
      stream_url: `https://plus.nhk.jp/watch/st/${program.stream_id}`,
      thumbnail: program.stream_type.program.images.nol_image.url,
    }));
  }
}
