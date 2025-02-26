import { NhkApi } from "../schema.ts";
import { NotFoundConfigError, SetConfigError } from "../common/exception.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { Repository } from "../common/types.ts";

export class ConfigNhkApiRepository implements Repository<NhkApi> {
  #kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.#kv = kv;
  }

  async get(): Promise<NhkApi> {
    const result = await this.#kv.get<NhkApi>(KV_KEYS.NHKAPI);
    if (result.value == null) {
      throw new NotFoundConfigError({
        message: `Not Found value. key: ${JSON.stringify(KV_KEYS.NHKAPI)}`,
      });
    }
    return result.value;
  }

  async save(value: NhkApi): Promise<void> {
    const result = await this.#kv.set(KV_KEYS.NHKAPI, value);
    if (!result.ok) {
      throw new SetConfigError({
        message: `Failed to set. key: ${
          JSON.stringify(KV_KEYS.NHKAPI)
        }, value: ${JSON.stringify(value)}`,
      });
    }
  }
}
