import { ZodIssue } from "zod";

// ZodIssueの配列からエラーメッセージを作成する
export function createErrorMessage(issues: ZodIssue[]) {
  return issues.map((issue) => {
    const field = issue.path.join(".");
    return `${field}: ${issue.message}`;
  });
}

export const messageHeader =
  "直近に公開開始した番組もしくは公開終了する番組です。\n" +
  "https://nhk-plus-board.deno.dev/programs/list";
