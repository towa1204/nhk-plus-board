import { recentProgramNotificationService } from "./init.ts";

export function cron() {
  Deno.cron("notification-daily job", "30 22 * * *", async () => {
    console.log("### 日次通知処理 START ###");
    await recentProgramNotificationService.execute(new Date());
    console.log("### 日次通知処理 END ###");
  });
}
