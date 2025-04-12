import { ZodIssue } from "zod";

// ZodIssueの配列からエラーメッセージを作成する
export function createErrorMessage(issues: ZodIssue[]) {
  return issues.map((issue) => {
    const field = issue.path.join(".");
    return `${field}: ${issue.message}`;
  });
}
