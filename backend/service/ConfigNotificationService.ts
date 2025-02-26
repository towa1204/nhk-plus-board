import { Repository } from "../common/types.ts";
import { Notification, NotificationSchema } from "../schema.ts";
import { createErrorMessage } from "../common/util.ts";
import { NotFoundConfigError } from "../common/exception.ts";

export class ConfigNotificationService {
  private readonly repository: Repository<Notification>;

  constructor(repository: Repository<Notification>) {
    this.repository = repository;
  }

  async get(): Promise<Notification> {
    try {
      return await this.repository.get();
    } catch (e) {
      if (e instanceof NotFoundConfigError) {
        return Promise.resolve({
          selectNow: "LINE",
          LineApi: {
            userid: "",
            accessToken: "",
          },
        });
      }
      throw e;
    }
  }

  async validateAndSave(value: unknown) {
    const result = NotificationSchema.safeParse(value);
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
