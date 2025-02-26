import { Repository } from "../common/types.ts";
import { NhkApiSchema } from "../schema.ts";
import { NhkApi } from "../schema.ts";
import { createErrorMessage } from "../common/util.ts";
import { NotFoundConfigError } from "../common/exception.ts";

export class ConfigNhkApiService {
  private readonly repository: Repository<NhkApi>;

  constructor(repository: Repository<NhkApi>) {
    this.repository = repository;
  }

  async get(): Promise<NhkApi> {
    try {
      return await this.repository.get();
    } catch (e) {
      if (e instanceof NotFoundConfigError) {
        return Promise.resolve({
          area: "東京",
          services: ["g1", "e1"],
          nhkApiKey: "",
        });
      }
      throw e;
    }
  }

  async validateAndSave(value: unknown) {
    const result = NhkApiSchema.safeParse(value);
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
