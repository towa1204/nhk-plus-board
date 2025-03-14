import { ConfigProgram } from "../schema.ts";
import { NotFoundConfigError, SetConfigError } from "../common/exception.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { Repository } from "../common/types.ts";

export class ProgramSettingRepository implements Repository<ConfigProgram> {
  #kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.#kv = kv;
  }

  async get(): Promise<ConfigProgram> {
    const result = await this.#kv.get<ConfigProgram>(KV_KEYS.PROGRAMS);
    if (result.value == null) {
      throw new NotFoundConfigError({
        message: `Not Found value. key: ${JSON.stringify(KV_KEYS.PROGRAMS)}`,
      });
    }
    return result.value;
  }

  async save(value: ConfigProgram): Promise<void> {
    const result = await this.#kv.set(KV_KEYS.PROGRAMS, value);
    if (!result.ok) {
      throw new SetConfigError({
        message: `Failed to set. key: ${
          JSON.stringify(KV_KEYS.PROGRAMS)
        }, value: ${JSON.stringify(value)}`,
      });
    }
  }
}
