import { Notification } from "../schema.ts";
import { NotFoundConfigError, SetConfigError } from "../common/exception.ts";
import { KV_KEYS } from "../common/kv_key.ts";
import { Repository } from "../common/types.ts";

export class ConfigNotificationRepository implements Repository<Notification> {
  #kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.#kv = kv;
  }

  async get(): Promise<Notification> {
    const result = await this.#kv.get<Notification>(KV_KEYS.NOTIFICATION);
    if (result.value == null) {
      throw new NotFoundConfigError({
        message: `Not Found value. key: ${
          JSON.stringify(KV_KEYS.NOTIFICATION)
        }`,
      });
    }
    return result.value;
  }

  async save(value: Notification): Promise<void> {
    const result = await this.#kv.set(KV_KEYS.NOTIFICATION, value);
    if (!result.ok) {
      throw new SetConfigError({
        message: `Failed to set. key: ${
          JSON.stringify(KV_KEYS.NOTIFICATION)
        }, value: ${JSON.stringify(value)}`,
      });
    }
  }
}
