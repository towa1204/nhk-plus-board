import { Repository } from "../common/types.ts";
import { AppSetting, AppSettingSchema } from "../schema.ts";
import { createErrorMessage } from "../common/util.ts";
import { NotFoundConfigError } from "../common/exception.ts";

type ToUnknown<T> = {
  [K in keyof T]: unknown;
};

export type UnknownAppSetting = ToUnknown<AppSetting>;

export class AppSettingService {
  private readonly repository: Repository<AppSetting>;

  constructor(repository: Repository<AppSetting>) {
    this.repository = repository;
  }

  async get(): Promise<AppSetting> {
    try {
      return await this.repository.get();
    } catch (e) {
      if (e instanceof NotFoundConfigError) {
        return Promise.resolve({
          notificationTarget: null,
          cosenseProject: null,
        });
      }
      throw e;
    }
  }

  async validateAndSave(value: UnknownAppSetting) {
    /* フォームで空文字で送られてきたときは未設定扱い */
    if (value.notificationTarget === "") value.notificationTarget = null;
    if (value.cosenseProject === "") value.cosenseProject = null;

    const result = AppSettingSchema.safeParse(value);
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
