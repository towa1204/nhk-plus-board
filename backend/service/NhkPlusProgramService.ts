import { PlaylistResponse } from "../client/nhk_api_types.ts";
import { INhkPlusClient } from "../client/NhkPlusClient.ts";
import { Repository } from "../common/types.ts";
import { WatchProgramKeys, WatchProgramResult } from "../model.ts";
export interface INhkPlusProgramService {
  fetchPrograms: () => Promise<WatchProgramResult[]>;
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

  public async fetchPrograms(): Promise<WatchProgramResult[]> {
    const { programs: programKeys } = await this.repository.get();

    const programResultList: WatchProgramResult[] = [];

    await Promise.all(
      programKeys
        // 有効な番組のみ取得
        .filter((programKey) => programKey.enabled)
        .map(async (programKey) => {
          const result = await this.nhkPlusClient.searchPrograms(
            programKey.title,
          );
          // 番組が見つからなかった場合はスキップ
          if (result.body.length === 0) return;
          programResultList.push(
            this.toWatchProgramResult(programKey.title, result),
          );
        }),
    );

    console.log(programResultList);

    return programResultList;
  }

  private toWatchProgramResult(
    keyword: string,
    playlistReponse: PlaylistResponse,
  ): WatchProgramResult {
    const programs = playlistReponse.body.map((program) => ({
      title: program.stream_type.program.title,
      published_period_from: program.published_period_from,
      published_period_to: program.published_period_to,
      subtitle: program.stream_type.program.subtitle,
      content: program.stream_type.program.content,
      series_url: program.stream_type.program.url.pc,
      stream_url: `https://plus.nhk.jp/watch/st/${program.stream_id}`,
      thumbnail: program.stream_type.program.images.nol_image.url,
    }));

    return {
      search_keyword: keyword,
      streams: programs,
    };
  }
}
