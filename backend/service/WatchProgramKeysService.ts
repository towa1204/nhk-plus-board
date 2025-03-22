import { Repository, ToUnknown } from "../common/types.ts";
import { WatchProgramKeys, WatchProgramKeysSchema } from "../model.ts";
import { createErrorMessage } from "../common/util.ts";

export type UnknownConfigProgram = ToUnknown<WatchProgramKeys>;

export class WatchProgramKeysService {
  private readonly repository: Repository<WatchProgramKeys>;

  constructor(repository: Repository<WatchProgramKeys>) {
    this.repository = repository;
  }

  async get(): Promise<WatchProgramKeys> {
    const result = await this.repository.get();
    return result;
  }

  async validateAndSave(value: UnknownConfigProgram) {
    const result = WatchProgramKeysSchema.safeParse(value);
    if (!result.success) {
      return {
        success: false,
        message: createErrorMessage(result.error.issues),
      } as const;
    }
    await this.repository.save(result.data);
    return { success: true, message: null } as const;
  }
}
