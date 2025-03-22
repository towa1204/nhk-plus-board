// import { today, week } from "./backend/common/date.ts";

export function cron() {
  Deno.cron("notification-daily job", "30 22 * * *", () => {
    console.log("### 日次通知処理 START ###");
    // await mainFlowService.execute([today(new Date())]);
    console.log("### 日次通知処理 END ###");
  });

  Deno.cron("notification-weekly job", "30 22 * * 1", () => {
    console.log("### 週次通知処理 START ###");
    // await mainFlowService.execute(week(new Date()));
    console.log("### 週次通知処理 END ###");
  });
}
