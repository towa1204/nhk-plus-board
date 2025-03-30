import { z } from "zod";

export const WatchProgramKeysSchema = z.object({
  programs: z.array(
    z.object({
      /**
       * 有効かどうか
       * 無効だと一覧画面に表示しない、通知しない
       */
      enabled: z.boolean(),
      /**
       * 番組タイトル名
       * この値を元に番組情報を取得する
       */
      title: z.string().nonempty(),
    }),
  ),
});

export const AppSettingSchema = z.object({
  /**
   * 通知先
   * nullは通知機能が無効を意味する
   */
  notificationApp: z.union([
    z.literal("LINE"),
    z.literal("Discord"),
    z.null(),
  ]),
  /**
   * Cosenseプロジェクト名
   * nullはCosenseページ作成機能が無効を意味する
   */
  cosenseProject: z.union([z.string().nonempty(), z.null()]),
});

export const ConfigSchema = WatchProgramKeysSchema
  .merge(AppSettingSchema);

export type WatchProgramKeys = z.infer<typeof WatchProgramKeysSchema>;
export type AppSetting = z.infer<typeof AppSettingSchema>;
export type Config = z.infer<typeof ConfigSchema>;

export type WatchProgram = {
  /**
   * 番組タイトル名
   * 例: えぇトコ ダイアン津田＆堀田真由 びわ湖満喫２人旅！～滋賀 大津市～
   */
  title: string;
  /**
   * NHK+での配信開始日時
   * 例: 2025-03-13T20:41:00+09:00
   */
  published_period_from: string;
  /**
   * NHK+での配信終了日時
   * 例: 2025-03-13T21:00:00+09:00
   */
  published_period_to: string;
  /**
   * 番組サブタイトル
   * 例: 滋賀出身・ダイアン津田と堀田真由が大津市をめぐる！...
   */
  subtitle: string;
  /**
   * 番組内容
   * 例: 津市はびわ湖の恵みが集まる街！滋賀出身・びわ湖を愛する２人、...
   */
  content: string;
  /**
   * 番組公式サイトURL
   * 例: https://www.nhk.jp/p/osaka-eetoko/ts/8X53QX9XM5/
   */
  series_url: string;
  /**
   * NHK+での配信URL
   * 例: https://plus.nhk.jp/watch/st/270_g1_202503064
   */
  stream_url: string;
  /**
   * 番組サムネイル画像URL
   * 例: https://www.nhk.jp/static/assets/images/tvepisode/te/Q6R7X3MGPJ/Q6R7X3MGPJ-eyecatch_a7163dc2ec41c4ca72e204efc9a18a15.jpg
   */
  thumbnail: string;
};

export type WatchProgramResult = {
  search_keyword: string;
  streams: WatchProgram[];
};

export type RecentPrograms = {
  /**
   * 直近に公開開始した番組
   * このサービスが実行された時刻の過去24時間以内に公開開始した番組
   */
  started: WatchProgram[];
  /**
   * 直近に公開終了する番組
   * このサービスが実行された時刻の未来24時間以内に公開終了する番組
   */
  willEnd: WatchProgram[];
};
