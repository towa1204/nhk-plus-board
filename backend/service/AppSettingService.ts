import { Repository, ToUnknown } from "../common/types.ts";
import { AppSetting, AppSettingSchema } from "../model.ts";
import { createErrorMessage } from "../common/util.ts";

export type UnknownAppSetting = ToUnknown<AppSetting>;

export class AppSettingService {
  private readonly repository: Repository<AppSetting>;

  constructor(repository: Repository<AppSetting>) {
    this.repository = repository;
  }

  async get(): Promise<AppSetting> {
    const result = await this.repository.get();
    return result;
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
