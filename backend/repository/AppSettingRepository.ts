import { AppSetting } from "../model.ts";
import { SetConfigError } from "../common/exception.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { Repository } from "../common/types.ts";

export class AppSettingRepository implements Repository<AppSetting> {
  #kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.#kv = kv;
  }

  async get(): Promise<AppSetting> {
    const result = await this.#kv.get<AppSetting>(KV_KEYS.APPSETTING);
    if (result.value === null) {
      return Promise.resolve({
        notificationApp: null,
        cosenseProject: null,
      });
    }
    return result.value;
  }

  async save(value: AppSetting): Promise<void> {
    const result = await this.#kv.set(KV_KEYS.APPSETTING, value);
    if (!result.ok) {
      throw new SetConfigError({
        message: `Failed to set. key: ${
          JSON.stringify(KV_KEYS.APPSETTING)
        }, value: ${JSON.stringify(value)}`,
      });
    }
  }
}
