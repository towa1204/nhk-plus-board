import { IMessageNotificationService } from "./MessageNotificationService.ts";
import { INhkPlusProgramService } from "./NhkPlusProgramService.ts";

/**
 * 直近に公開開始した番組もしくは公開終了する番組を指定のAPPに通知する
 * 直近に公開開始した番組とは、このサービスが実行された時刻の過去24時間以内に公開開始した番組
 * 直近に公開終了する番組とは、このサービスが実行された時刻の未来24時間以内に公開終了する番組
 */
export class RecentProgramNotifcationService {
  private readonly nhkPlusProgramService: INhkPlusProgramService;
  private readonly messageNotificationService: IMessageNotificationService;

  constructor(
    nhkPlusProgramService: INhkPlusProgramService,
    messageNotificationService: IMessageNotificationService,
  ) {
    this.nhkPlusProgramService = nhkPlusProgramService;
    this.messageNotificationService = messageNotificationService;
  }

  async execute(calledDate: Date): Promise<void> {
    const NOTIFICATION_WINDOW = 24 * 60 * 60 * 1000; // 24時間

    const programs = await this.nhkPlusProgramService.fetchPrograms();

    const recentStartedPrograms = programs.map((program) => {
      return program.streams.filter((stream) => {
        const start = new Date(stream.published_period_from);
        const isStarted =
          calledDate.getTime() - start.getTime() < NOTIFICATION_WINDOW;

        return isStarted;
      });
    }).flat();

    const recentWillEndPrograms = programs.map((program) => {
      return program.streams.filter((stream) => {
        const end = new Date(stream.published_period_to);
        const isWillEnd =
          end.getTime() - calledDate.getTime() < NOTIFICATION_WINDOW;

        return isWillEnd;
      });
    }).flat();

    await this.messageNotificationService.execute({
      started: recentStartedPrograms,
      willEnd: recentWillEndPrograms,
    });
  }
}
