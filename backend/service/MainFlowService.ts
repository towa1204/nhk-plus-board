import { INhkPlusProgramService } from "./NhkPlusProgramService.ts";

export class MainFlowService {
  private readonly nhkPlusProgramService: INhkPlusProgramService;

  constructor(
    nhkPlusProgramService: INhkPlusProgramService,
  ) {
    this.nhkPlusProgramService = nhkPlusProgramService;
  }

  async execute(_: string[]) {
    // const programs = await this.nhkProgramService.listByDates(dates);
    // await this.notificationService.execute([]);
  }
}
