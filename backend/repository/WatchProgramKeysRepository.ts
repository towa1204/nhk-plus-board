import { WatchProgramKeys } from "../model.ts";
import { SetConfigError } from "../common/exception.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { Repository } from "../common/types.ts";

export class WatchProgramKeysRepository
  implements Repository<WatchProgramKeys> {
  #kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.#kv = kv;
  }

  async get(): Promise<WatchProgramKeys> {
    const result = await this.#kv.get<WatchProgramKeys>(KV_KEYS.PROGRAMS);
    if (result.value === null) {
      return Promise.resolve({
        programs: [],
      });
    }
    return result.value;
  }

  async save(value: WatchProgramKeys): Promise<void> {
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
