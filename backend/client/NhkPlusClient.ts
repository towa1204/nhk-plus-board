import { ApiClientError } from "../common/exception.ts";
import { PlaylistResponse } from "./nhk_api_types.ts";

export interface INhkPlusClient {
  searchPrograms: (keyword: string) => Promise<PlaylistResponse>;
}

export class NhkPlusClient implements INhkPlusClient {
  private static readonly NHK_PLUS_BASE_PATH = "https://api-plus.nhk.jp/r5/pl2";

  /**
   * NHK+で配信中の番組を検索する
   * @param keyword 検索キーワード
   * @throws ApiClientError
   * @returns 配信中の番組
   */
  public async searchPrograms(keyword: string): Promise<PlaylistResponse> {
    const url =
      `${NhkPlusClient.NHK_PLUS_BASE_PATH}/search?keyword=${keyword}&area=all&play_vod=true&range=-2w:now&sort_type=asc`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new ApiClientError({
        url,
        status: res.status,
        responseBody: await res.text(),
        message: `NHK+ 検索APIへの接続に失敗しました`,
      });
    }

    return await res.json() as PlaylistResponse;
  }
}
