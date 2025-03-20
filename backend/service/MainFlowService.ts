// import { INhkProgramService } from "./NhkProgramService.ts";
import { INotificationService } from "./NotificationService.ts";

export class MainFlowService {
  // private readonly nhkProgramService: INhkProgramService;
  private readonly notificationService: INotificationService;

  constructor(
    // nhkProgramService: INhkProgramService,
    notificationService: INotificationService,
  ) {
    // this.nhkProgramService = nhkProgramService;
    this.notificationService = notificationService;
  }

  async execute(dates: string[]) {
    // const programs = await this.nhkProgramService.listByDates(dates);
    await this.notificationService.execute([]);
  }
}
