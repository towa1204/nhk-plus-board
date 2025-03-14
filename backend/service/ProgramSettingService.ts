import { Repository, ToUnknown } from "../common/types.ts";
import { ConfigProgram, ConfigProgramSchema } from "../schema.ts";
import { createErrorMessage } from "../common/util.ts";
import { NotFoundConfigError } from "../common/exception.ts";

export type UnknownConfigProgram = ToUnknown<ConfigProgram>;

export class ProgramSettingService {
  private readonly repository: Repository<ConfigProgram>;

  constructor(repository: Repository<ConfigProgram>) {
    this.repository = repository;
  }

  async get(): Promise<ConfigProgram> {
    try {
      return await this.repository.get();
    } catch (e) {
      if (e instanceof NotFoundConfigError) {
        return Promise.resolve({
          programs: [],
        });
      }
      throw e;
    }
  }

  async validateAndSave(value: UnknownConfigProgram) {
    const result = ConfigProgramSchema.safeParse(value);
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
